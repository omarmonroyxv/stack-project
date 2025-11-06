import axios from 'axios';
import * as cheerio from 'cheerio';
import cacheService from './cacheService.js';

class ScrapingService {
  constructor() {
    this.sources = {
      flashscore: 'https://www.flashscore.com',
      livescore: 'https://www.livescore.com'
    };
  }

  // Scraping de FlashScore (ejemplo - necesitarás adaptar los selectores)
  async scrapeFlashScore() {
    try {
      console.log('🕷️ Iniciando scraping de FlashScore...');
      
      const response = await axios.get(this.sources.flashscore, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const matches = [];

      // NOTA: Estos selectores son ejemplos y necesitan ser ajustados
      // según la estructura real del sitio
      $('.event__match').each((i, element) => {
        const homeTeam = $(element).find('.event__participant--home').text().trim();
        const awayTeam = $(element).find('.event__participant--away').text().trim();
        const score = $(element).find('.event__score').text().trim();
        const time = $(element).find('.event__time').text().trim();
        const status = $(element).find('.event__stage').text().trim();

        if (homeTeam && awayTeam) {
          matches.push({
            homeTeam,
            awayTeam,
            score,
            time,
            status,
            source: 'flashscore',
            scrapedAt: new Date().toISOString()
          });
        }
      });

      console.log(`✅ Scraped ${matches.length} partidos de FlashScore`);
      return matches;

    } catch (error) {
      console.error('Error scrapeando FlashScore:', error.message);
      return [];
    }
  }

  // Scraping de LiveScore (backup)
  async scrapeLiveScore() {
    try {
      console.log('🕷️ Iniciando scraping de LiveScore...');
      
      const response = await axios.get(this.sources.livescore, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const matches = [];

      // NOTA: Ajusta estos selectores según la estructura real
      $('.match-row').each((i, element) => {
        const homeTeam = $(element).find('.home-team').text().trim();
        const awayTeam = $(element).find('.away-team').text().trim();
        const homeScore = $(element).find('.home-score').text().trim();
        const awayScore = $(element).find('.away-score').text().trim();
        const status = $(element).find('.match-status').text().trim();

        if (homeTeam && awayTeam) {
          matches.push({
            homeTeam,
            awayTeam,
            score: `${homeScore} - ${awayScore}`,
            status,
            source: 'livescore',
            scrapedAt: new Date().toISOString()
          });
        }
      });

      console.log(`✅ Scraped ${matches.length} partidos de LiveScore`);
      return matches;

    } catch (error) {
      console.error('Error scrapeando LiveScore:', error.message);
      return [];
    }
  }

  // Método principal que intenta múltiples fuentes
  async getScrapedMatches() {
    const cacheKey = 'scraped_matches';
    
    // Verificar cache
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log('📦 Matches scrapeados desde cache');
      return cached;
    }

    // Intentar scraping de múltiples fuentes
    let matches = [];

    // Intentar FlashScore primero
    const flashscoreMatches = await this.scrapeFlashScore();
    if (flashscoreMatches.length > 0) {
      matches = flashscoreMatches;
    } else {
      // Si falla, intentar LiveScore
      const livescoreMatches = await this.scrapeLiveScore();
      matches = livescoreMatches;
    }

    // Guardar en cache por 3 minutos
    if (matches.length > 0) {
      await cacheService.set(cacheKey, matches, 180);
    }

    return matches;
  }

  // Método para actualizar scores de partidos específicos
  async updateMatchScore(homeTeam, awayTeam) {
    const matches = await this.getScrapedMatches();
    
    const match = matches.find(m => 
      m.homeTeam.toLowerCase().includes(homeTeam.toLowerCase()) &&
      m.awayTeam.toLowerCase().includes(awayTeam.toLowerCase())
    );

    return match || null;
  }

  // Verificar si un gol fue marcado comparando scores
  detectGoal(oldScore, newScore) {
    if (!oldScore || !newScore) return false;
    
    const parseScore = (score) => {
      const parts = score.split('-').map(s => parseInt(s.trim()));
      return { home: parts[0] || 0, away: parts[1] || 0 };
    };

    const old = parseScore(oldScore);
    const newS = parseScore(newScore);

    return (newS.home > old.home) || (newS.away > old.away);
  }
}

export default new ScrapingService();
