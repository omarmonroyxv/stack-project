import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import cron from 'node-cron';
import Fixture from '../models/Fixture.js';

class scrapingService {
  constructor() {
    this.baseUrl = 'https://m.aiscore.com/es';
    this.isRunning = false;
    this.browser = null;
    this.stats = {
      totalUpdates: 0,
      lastUpdate: null,
      lastError: null,
      fixturesUpdated: 0
    };
  }

  /**
   * Iniciar el bot de scraping
   */
  start() {
    console.log('🕷️ Scraping Bot iniciado');
    console.log('📡 Actualizaciones cada 10 minutos');

    // Ejecutar inmediatamente
    this.updateAllData();

    // Cron: cada 10 minutos
    cron.schedule('*/10 * * * *', () => {
      this.updateAllData();
    });

    // Actualización nocturna completa (3 AM)
    cron.schedule('0 3 * * *', () => {
      console.log('🌙 Actualización nocturna completa');
      this.fullDatabaseRefresh();
    });
  }

  /**
   * Inicializar navegador Puppeteer con Chromium para serverless
   */
  async initBrowser() {
    if (this.browser) {
      return this.browser;
    }

    try {
      console.log('🔧 Iniciando Chromium...');
      
      // Configuración para Render usando @sparticuz/chromium
      this.browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
      
      console.log('✅ Chromium iniciado correctamente');
      return this.browser;
      
    } catch (error) {
      console.error('❌ Error iniciando Chromium:', error.message);
      console.error('Stack:', error.stack);
      return null;
    }
  }

  /**
   * Actualizar todos los datos
   */
  async updateAllData() {
    if (this.isRunning) {
      console.log('⏳ Actualización anterior aún en progreso...');
      return;
    }

    this.isRunning = true;
    const startTime = Date.now();

    try {
      console.log('🔄 [SCRAPING] Iniciando actualización...');

      const browser = await this.initBrowser();
      if (!browser) {
        throw new Error('No se pudo iniciar el navegador');
      }

      // Scraping de partidos
      const matches = await this.scrapeMatches(browser);
      
      // Guardar en MongoDB
      await this.saveToDatabase('live_fixtures', matches.live);
      await this.saveToDatabase('today_fixtures', matches.today);

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      this.stats.totalUpdates++;
      this.stats.lastUpdate = new Date();
      this.stats.fixturesUpdated = matches.live.length + matches.today.length;

      console.log(`✅ [SCRAPING] Actualización completa en ${duration}s`);
      console.log(`📊 Partidos actualizados: ${this.stats.fixturesUpdated}`);

    } catch (error) {
      console.error('❌ [SCRAPING] Error:', error.message);
      this.stats.lastError = error.message;
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Scraping de partidos desde aiscore
   */
  async scrapeMatches(browser) {
    const page = await browser.newPage();
    
    try {
      console.log('📡 Navegando a aiscore...');
      
      // Configurar user agent móvil
      await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15');
      
      // Ir a la página
      await page.goto(this.baseUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      console.log('⏳ Esperando carga completa...');
      await new Promise(resolve => setTimeout(resolve, 8000));

      // Scroll para cargar más contenido
      await this.autoScroll(page);

      console.log('🔍 Extrayendo partidos...');

      // Extraer todos los enlaces de partidos
      const matchLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="/match-"]'));
        return links.map(link => ({
          url: link.href,
          text: link.innerText
        }));
      });

      console.log(`📊 Encontrados ${matchLinks.length} partidos`);

      // Procesar enlaces y extraer datos
      const allMatches = await this.processMatchLinks(matchLinks);

      // Separar en vivo y del día
      const liveMatches = allMatches.filter(m => this.isLive(m));
      const todayMatches = allMatches.filter(m => !this.isLive(m));

      console.log(`🔴 En vivo: ${liveMatches.length}`);
      console.log(`📅 Hoy: ${todayMatches.length}`);

      await page.close();

      return {
        live: liveMatches,
        today: todayMatches
      };

    } catch (error) {
      console.error('❌ Error en scraping:', error.message);
      try { await page.close(); } catch {}
      return { live: [], today: [] };
    }
  }

  /**
   * Auto scroll en la página
   */
  async autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight || totalHeight > 3000) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  /**
   * Procesar enlaces de partidos
   */
  async processMatchLinks(links) {
    const matches = [];
    const processedUrls = new Set();

    for (const link of links.slice(0, 50)) {
      try {
        if (processedUrls.has(link.url)) continue;
        processedUrls.add(link.url);

        const match = this.parseMatchFromText(link.text, link.url);
        if (match) {
          matches.push(match);
        }
      } catch (error) {
        continue;
      }
    }

    return matches;
  }

  /**
   * Parsear datos del partido desde texto
   */
  parseMatchFromText(text, url) {
    try {
      const lines = text.split('\n').map(l => l.trim()).filter(l => l);
      
      const teams = [];
      for (const line of lines) {
        if (!/^\d+[:\']/.test(line) && !/^\d{1,2}:\d{2}/.test(line) && line.length > 2) {
          teams.push(line);
          if (teams.length === 2) break;
        }
      }

      if (teams.length < 2) {
        const match = url.match(/\/match-([^/]+)\//);
        if (match) {
          const parts = match[1].split('-');
          const mid = Math.floor(parts.length / 2);
          teams.push(parts.slice(0, mid).join(' '));
          teams.push(parts.slice(mid).join(' '));
        }
      }

      if (teams.length < 2) return null;

      const scoreMatch = text.match(/(\d+)\s*-\s*(\d+)/);
      const score = scoreMatch ? {
        home: parseInt(scoreMatch[1]),
        away: parseInt(scoreMatch[2])
      } : null;

      let status = 'NS';
      let elapsed = null;
      
      const timeMatch = text.match(/(\d{1,2}:\d{2})/);
      if (timeMatch) status = 'NS';
      
      const minuteMatch = text.match(/(\d{1,3})'/);
      if (minuteMatch) {
        status = '1H';
        elapsed = parseInt(minuteMatch[1]);
      }

      if (text.includes('FT') || text.includes('Finalizado')) {
        status = 'FT';
      }

      const league = this.extractLeague(text);

      return {
        fixture: {
          id: this.generateId(url),
          date: new Date().toISOString(),
          timestamp: Math.floor(Date.now() / 1000),
          status: {
            long: this.getStatusLong(status),
            short: status,
            elapsed: elapsed
          }
        },
        league: {
          id: this.generateLeagueId(league),
          name: league,
          country: 'Various',
          logo: null,
          flag: null,
          season: new Date().getFullYear(),
          round: 'Regular Season'
        },
        teams: {
          home: {
            id: this.generateTeamId(teams[0]),
            name: this.capitalize(teams[0]),
            logo: null,
            winner: score ? score.home > score.away : null
          },
          away: {
            id: this.generateTeamId(teams[1]),
            name: this.capitalize(teams[1]),
            logo: null,
            winner: score ? score.away > score.home : null
          }
        },
        goals: score || { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: score || { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      };

    } catch (error) {
      return null;
    }
  }

  extractLeague(text) {
    const keywords = ['league', 'liga', 'cup', 'copa', 'premier', 'championship'];
    const lines = text.split('\n');
    
    for (const line of lines) {
      const lower = line.toLowerCase();
      if (keywords.some(k => lower.includes(k)) && line.length > 5) {
        return line.trim();
      }
    }
    
    return 'International Friendly';
  }

  isLive(match) {
    const status = match.fixture?.status?.short;
    return ['1H', '2H', 'HT', 'ET', 'P', 'LIVE'].includes(status);
  }

  generateId(url) {
    return Math.abs(this.hashCode(url));
  }

  generateLeagueId(league) {
    return Math.abs(this.hashCode(league || 'unknown'));
  }

  generateTeamId(team) {
    return Math.abs(this.hashCode(team || 'unknown'));
  }

  hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }

  capitalize(str) {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  getStatusLong(short) {
    const map = {
      'NS': 'Not Started',
      '1H': 'First Half',
      'HT': 'Halftime',
      '2H': 'Second Half',
      'ET': 'Extra Time',
      'P': 'Penalty',
      'FT': 'Match Finished',
      'AET': 'Match Finished After Extra Time',
      'PEN': 'Match Finished After Penalty'
    };
    return map[short] || 'Not Started';
  }

  async saveToDatabase(key, data) {
    try {
      await Fixture.findOneAndUpdate(
        { cacheKey: key },
        {
          cacheKey: key,
          data: data,
          updatedAt: new Date()
        },
        { upsert: true, new: true }
      );
      console.log(`💾 Guardado: ${key} (${data.length} items)`);
    } catch (error) {
      console.error(`❌ Error guardando ${key}:`, error.message);
    }
  }

  async fullDatabaseRefresh() {
    console.log('🌙 Iniciando actualización completa...');
    
    await this.updateAllData();
    
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    await Fixture.deleteMany({ updatedAt: { $lt: sevenDaysAgo } });
    
    console.log('✅ Actualización completa terminada');
  }

  getStats() {
    return {
      ...this.stats,
      isRunning: this.isRunning,
      nextUpdate: this.getNextUpdateTime(),
      scrapingIntervalMinutes: 10
    };
  }

  getNextUpdateTime() {
    const now = new Date();
    const minutes = now.getMinutes();
    const nextTen = Math.ceil(minutes / 10) * 10;
    const next = new Date(now);
    next.setMinutes(nextTen, 0, 0);
    return next;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔒 Navegador cerrado');
    }
  }
}

export default new scrapingService();