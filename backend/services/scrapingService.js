import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import cron from 'node-cron';
import Fixture from '../models/Fixture.js';

class ScrapingService {
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

  start() {
    console.log('🕷️ Scraping Bot iniciado');
    console.log('📡 Actualizaciones cada 10 minutos');

    this.updateAllData();

    cron.schedule('*/10 * * * *', () => {
      this.updateAllData();
    });

    cron.schedule('0 3 * * *', () => {
      console.log('🌙 Actualización nocturna completa');
      this.fullDatabaseRefresh();
    });
  }

  async initBrowser() {
    if (this.browser) {
      return this.browser;
    }

    try {
      console.log('🔧 Iniciando Chromium...');
      
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
      return null;
    }
  }

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

      const partidos = await this.extraerPartidosCompleto(browser);
      
      const liveMatches = partidos.filter(m => this.isLive(m));
      const todayMatches = partidos.filter(m => !this.isLive(m));

      console.log(`🔴 En vivo: ${liveMatches.length}`);
      console.log(`📅 Hoy: ${todayMatches.length}`);
      
      await this.saveToDatabase('live_fixtures', liveMatches);
      await this.saveToDatabase('today_fixtures', todayMatches);

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      this.stats.totalUpdates++;
      this.stats.lastUpdate = new Date();
      this.stats.fixturesUpdated = liveMatches.length + todayMatches.length;

      console.log(`✅ [SCRAPING] Actualización completa en ${duration}s`);
      console.log(`📊 Partidos actualizados: ${this.stats.fixturesUpdated}`);

    } catch (error) {
      console.error('❌ [SCRAPING] Error:', error.message);
      this.stats.lastError = error.message;
    } finally {
      this.isRunning = false;
    }
  }

  async extraerPartidosCompleto(browser) {
    const page = await browser.newPage();
    
    try {
      console.log('📡 Navegando a aiscore...');
      await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15');
      await page.goto(this.baseUrl, { waitUntil: 'networkidle2', timeout: 90000 });
      
      console.log('⏳ Esperando 10 segundos...');
      await new Promise(resolve => setTimeout(resolve, 10000));

      console.log('📂 Expandiendo secciones...');
      try {
        const collapseButtons = await page.$$("div[class*='collapse'], div[class*='list_title']");
        for (let i = 0; i < Math.min(collapseButtons.length, 50); i++) {
          try {
            await collapseButtons[i].scrollIntoView();
            await new Promise(resolve => setTimeout(resolve, 200));
            await collapseButtons[i].click();
            await new Promise(resolve => setTimeout(resolve, 300));
          } catch (e) {}
        }
        console.log('✅ Secciones expandidas');
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.log('⚠️ Advertencia expandiendo secciones:', e.message);
      }

      console.log('📜 Haciendo scroll...');
      const MAX_SCROLLS = 15;
      const SCROLL_PAUSE_TIME = 3000;
      
      for (let i = 0; i < MAX_SCROLLS; i++) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await new Promise(resolve => setTimeout(resolve, SCROLL_PAUSE_TIME));
      }

      console.log('🔍 Extrayendo partidos...');
      
      const htmlSource = await page.content();
      
      // SELECTOR CORRECTO - Sin '/' como en Python
      const elementos = await page.$$("a[href*='match']");
      
      console.log(`📊 Encontrados ${elementos.length} elementos`);

      const partidos = [];
      const urlsProcesadas = new Set();
      let nuevos = 0;

      for (let i = 0; i < elementos.length; i++) {
        try {
          const elemento = elementos[i];
          let url = await elemento.evaluate(el => el.href);
          
          if (!url || urlsProcesadas.has(url)) continue;
          
          // Validar que sea URL de partido válida
          if (!url.includes('match') || url.includes('h2h')) {
            if (url.includes('h2h')) {
              url = url.replace('/h2h', '');
            } else {
              continue;
            }
          }
          
          urlsProcesadas.add(url);

          // Extraer nombres desde texto
          let local, visitante;
          const resultado = await this.extraerNombresDesdeTexto(elemento);
          local = resultado.local;
          visitante = resultado.visitante;

          if (!local || !visitante) {
            const resultadoUrl = this.extraerNombresDesdeUrl(url);
            local = resultadoUrl.local;
            visitante = resultadoUrl.visitante;
          }

          if (!local || !visitante) continue;

          const hora = await this.extraerHora(elemento);

          let liga = await this.detectarLigaDesdeElementoPadre(elemento);
          
          if (!liga) {
            liga = await this.extraerLigaDesdeHtmlCercano(elemento, htmlSource);
          }

          if (!liga) {
            liga = 'Sin clasificar';
          }

          const partido = this.crearObjetoPartido(local, visitante, hora, liga, url);
          partidos.push(partido);
          nuevos++;

          if ((i + 1) % 10 === 0) {
            console.log(`  Procesados ${i + 1}/${elementos.length}... (${nuevos} válidos)`);
          }

        } catch (error) {
          continue;
        }
      }

      await page.close();
      
      console.log(`✅ Extracción completa: ${partidos.length} partidos de ${elementos.length} elementos`);
      return partidos;

    } catch (error) {
      console.error('❌ Error en scraping:', error.message);
      try { await page.close(); } catch {}
      return [];
    }
  }

  async extraerNombresDesdeTexto(elemento) {
    try {
      const texto = await elemento.evaluate(el => el.innerText);
      const lineas = texto.split('\n').map(l => l.trim()).filter(l => l);
      
      const equipos = [];
      
      for (const linea of lineas) {
        if (/^\d{1,3}'/.test(linea)) continue;
        if (/\d{1,2}:\d{2}/.test(linea)) continue;
        if (['FT', 'HT', 'FINALIZADO', 'EN VIVO'].includes(linea.toUpperCase())) continue;
        if (/^[\d\s\-]+$/.test(linea)) continue;
        
        if (linea.length > 2 && !/^\d+$/.test(linea)) {
          equipos.push(linea);
        }
      }
      
      if (equipos.length >= 2) {
        return { local: equipos[0], visitante: equipos[1] };
      }
      
      return { local: null, visitante: null };
      
    } catch {
      return { local: null, visitante: null };
    }
  }

  extraerNombresDesdeUrl(url) {
    try {
      const match = url.match(/\/match-([^/]+)\//);
      if (!match) return { local: null, visitante: null };
      
      const nombres = match[1];
      const partes = nombres.split('-');
      
      if (partes.length < 4) {
        const mitad = Math.floor(partes.length / 2);
        const local = partes.slice(0, mitad).map(p => this.capitalize(p)).join(' ');
        const visitante = partes.slice(mitad).map(p => this.capitalize(p)).join(' ');
        return { local, visitante };
      }
      
      const palabrasClub = new Set(['fc', 'sc', 'ac', 'cd', 'ca', 'cf', 'sd', 'club', 'deportivo',
                                    'atletico', 'sporting', 'real', 'unidos', 'united', 'city']);
      
      let mejorDivision = Math.floor(partes.length / 2);
      let mejorScore = -999;
      
      for (let i = 1; i < partes.length; i++) {
        let score = 0;
        const balance = Math.abs(i - (partes.length - i));
        score -= balance;
        
        if (palabrasClub.has(partes[i-1].toLowerCase())) score += 5;
        if (i < partes.length && palabrasClub.has(partes[i].toLowerCase())) score += 5;
        
        if (score > mejorScore) {
          mejorScore = score;
          mejorDivision = i;
        }
      }
      
      const local = partes.slice(0, mejorDivision).map(p => this.capitalize(p)).join(' ');
      const visitante = partes.slice(mejorDivision).map(p => this.capitalize(p)).join(' ');
      return { local, visitante };
            
    } catch {
      return { local: null, visitante: null };
    }
  }

  async extraerHora(elemento) {
    try {
      const texto = await elemento.evaluate(el => el.innerText);
      
      const horaMatch = texto.match(/\d{1,2}:\d{2}\s*[ap]\.?m\.?/i);
      if (horaMatch) return horaMatch[0];
      
      const minutoMatch = texto.match(/\d{1,3}'/);
      if (minutoMatch) return minutoMatch[0];
      
      if (texto.includes('FT') || texto.includes('Finalizado')) return 'FT';
      if (texto.includes('HT')) return 'HT';
      
      const html = await elemento.evaluate(el => el.innerHTML);
      const htmlMatch = html.match(/(\d{1,2}:\d{2}\s*[ap]\.?m\.?)/i);
      if (htmlMatch) return htmlMatch[1];
      
      return 'vs';
      
    } catch {
      return 'vs';
    }
  }

  async detectarLigaDesdeElementoPadre(elemento) {
    try {
      let currentElement = elemento;
      
      for (let level = 0; level < 5; level++) {
        try {
          currentElement = await currentElement.evaluateHandle(el => el.parentElement);
          
          const headers = await currentElement.$$("*[class*='title'], *[class*='header'], *[class*='league'], *[class*='list']");
          
          for (const header of headers) {
            const texto = await header.evaluate(el => el.innerText?.trim());
            
            if (!texto || texto.length < 10 || texto.length > 100) continue;
            
            if (texto.includes(':')) {
              const partes = texto.split(':');
              if (partes.length >= 2) {
                const liga = partes[1].trim();
                
                if (liga.length > 5 && !/\d{1,2}:\d{2}/.test(liga)) {
                  const palabrasClave = ['league', 'liga', 'cup', 'copa', 'championship', 
                                        'division', 'super', 'primera', 'nacional'];
                  
                  if (palabrasClave.some(palabra => liga.toLowerCase().includes(palabra))) {
                    return liga;
                  }
                }
              }
            }
            else {
              const palabrasClave = ['league', 'liga', 'cup', 'copa', 'championship', 
                                    'division', 'super', 'primera', 'nacional'];
              
              if (palabrasClave.some(palabra => texto.toLowerCase().includes(palabra))) {
                if (!/\d{1,2}:\d{2}/.test(texto) && !/\d+\s*-\s*\d+/.test(texto)) {
                  return texto;
                }
              }
            }
          }
        } catch {
          break;
        }
      }
      
      return null;
      
    } catch {
      return null;
    }
  }

  async extraerLigaDesdeHtmlCercano(elemento, htmlSource) {
    try {
      const elementoHtml = await elemento.evaluate(el => el.outerHTML);
      const pos = htmlSource.indexOf(elementoHtml.substring(0, 200));
      
      if (pos > 0) {
        const contextoPrevio = htmlSource.substring(Math.max(0, pos - 5000), pos);
        
        const matches = contextoPrevio.matchAll(/([^<>"]{3,50})\s*:\s*([^<>"]{5,80})/g);
        
        for (const match of Array.from(matches).reverse()) {
          const posibleLiga = match[2].trim();
          
          if (posibleLiga.length > 5) {
            if (!/\d{1,2}:\d{2}/.test(posibleLiga) && !/\d+\s*-\s*\d+/.test(posibleLiga)) {
              const palabrasClave = ['league', 'liga', 'cup', 'copa', 'championship', 
                                    'division', 'super', 'primera', 'nacional', 'association', 'asociación'];
              
              if (palabrasClave.some(palabra => posibleLiga.toLowerCase().includes(palabra))) {
                return posibleLiga;
              }
            }
          }
        }
        
        const textMatches = contextoPrevio.matchAll(/>([^<]{10,80})</g);
        
        for (const match of Array.from(textMatches).reverse()) {
          const texto = match[1].trim();
          
          const palabrasClave = ['league', 'liga', 'cup', 'copa', 'championship', 
                                'division', 'super', 'primera', 'nacional'];
          
          if (palabrasClave.some(palabra => texto.toLowerCase().includes(palabra))) {
            if (!/\d{1,2}:\d{2}/.test(texto) && !/\d+\s*-\s*\d+/.test(texto)) {
              if (texto.length > 8 && texto.split(' ').length >= 2) {
                return texto;
              }
            }
          }
        }
      }
    } catch {}
    
    return null;
  }

  crearObjetoPartido(local, visitante, hora, liga, url) {
    let status = 'NS';
    let elapsed = null;
    
    if (hora.includes("'")) {
      status = '1H';
      elapsed = parseInt(hora);
    } else if (hora === 'FT') {
      status = 'FT';
    } else if (hora === 'HT') {
      status = 'HT';
    }

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
        id: this.generateLeagueId(liga),
        name: liga,
        country: 'Various',
        logo: null,
        flag: null,
        season: new Date().getFullYear(),
        round: 'Regular Season'
      },
      teams: {
        home: {
          id: this.generateTeamId(local),
          name: local,
          logo: null,
          winner: null
        },
        away: {
          id: this.generateTeamId(visitante),
          name: visitante,
          logo: null,
          winner: null
        }
      },
      goals: { home: null, away: null },
      score: {
        halftime: { home: null, away: null },
        fulltime: { home: null, away: null },
        extratime: { home: null, away: null },
        penalty: { home: null, away: null }
      }
    };
  }

  isLive(match) {
    const status = match.fixture?.status?.short;
    return ['1H', '2H', 'HT', 'ET', 'P', 'LIVE'].includes(status);
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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

export default new ScrapingService();