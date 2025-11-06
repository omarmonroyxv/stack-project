import axios from 'axios';
import { config } from '../config/config.js';
import cacheService from './cacheService.js';

class ApiSportsService {
  constructor() {
    this.baseUrl = config.apiSports.baseUrl;
    this.apiKey = config.apiSports.key;
    this.host = config.apiSports.host;
    this.requestCount = 0;
    this.maxRequests = config.rateLimiting.maxRequestsPerHour;
    this.resetTime = Date.now() + 3600000; // 1 hora
  }

  resetCounter() {
    const now = Date.now();
    if (now >= this.resetTime) {
      this.requestCount = 0;
      this.resetTime = now + 3600000;
      console.log('🔄 Contador de requests reseteado');
    }
  }

  canMakeRequest() {
    this.resetCounter();
    return this.requestCount < this.maxRequests;
  }

  async makeRequest(endpoint, params = {}) {
    if (!this.canMakeRequest()) {
      console.log('⚠️ Límite de requests alcanzado, usando cache');
      return null;
    }

    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': this.host
        },
        params
      });

      this.requestCount++;
      console.log(`📡 Request ${this.requestCount}/${this.maxRequests} - ${endpoint}`);

      return response.data;
    } catch (error) {
      console.error(`Error en API Sports (${endpoint}):`, error.message);
      return null;
    }
  }

  // Obtener partidos en vivo
  async getLiveMatches() {
    const cacheKey = 'live_matches';
    
    // Intentar obtener del cache primero
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log('📦 Partidos en vivo desde cache');
      return cached;
    }

    // Si no hay cache, hacer request a la API
    const data = await this.makeRequest('/fixtures', { live: 'all' });
    
    if (data && data.response) {
      // Guardar en cache por 5 minutos (300 segundos)
      await cacheService.set(cacheKey, data.response, config.cache.ttlLive);
      return data.response;
    }

    return [];
  }

  // Obtener fixtures del día
  async getTodayFixtures() {
    const cacheKey = `fixtures_today_${new Date().toISOString().split('T')[0]}`;
    
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log('📦 Fixtures de hoy desde cache');
      return cached;
    }

    const today = new Date().toISOString().split('T')[0];
    const data = await this.makeRequest('/fixtures', { date: today });
    
    if (data && data.response) {
      await cacheService.set(cacheKey, data.response, config.cache.ttlFixtures);
      return data.response;
    }

    return [];
  }

  // Obtener detalles de un partido específico
  async getFixtureById(fixtureId) {
    const cacheKey = `fixture_${fixtureId}`;
    
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    const data = await this.makeRequest('/fixtures', { id: fixtureId });
    
    if (data && data.response && data.response[0]) {
      await cacheService.set(cacheKey, data.response[0], 180); // 3 minutos
      return data.response[0];
    }

    return null;
  }

  // Obtener ligas principales
  async getMainLeagues() {
    const cacheKey = 'main_leagues';
    
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    // IDs de las ligas principales
    const mainLeagueIds = [
      39,  // Premier League
      140, // La Liga
      135, // Serie A
      78,  // Bundesliga
      61,  // Ligue 1
      2,   // UEFA Champions League
      3,   // UEFA Europa League
      848, // Liga MX
      128, // Liga Profesional Argentina
      71   // Brasileirão
    ];

    const data = await this.makeRequest('/leagues', { 
      current: true,
      season: new Date().getFullYear()
    });
    
    if (data && data.response) {
      const filtered = data.response.filter(league => 
        mainLeagueIds.includes(league.league.id)
      );
      await cacheService.set(cacheKey, filtered, 86400); // 24 horas
      return filtered;
    }

    return [];
  }

  // Obtener clasificación de una liga
  async getStandings(leagueId, season) {
    const cacheKey = `standings_${leagueId}_${season}`;
    
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    const data = await this.makeRequest('/standings', { 
      league: leagueId,
      season: season
    });
    
    if (data && data.response && data.response[0]) {
      await cacheService.set(cacheKey, data.response[0], config.cache.ttlStandings);
      return data.response[0];
    }

    return null;
  }

  // Obtener estadísticas de requests
  getStats() {
    this.resetCounter();
    const remainingTime = Math.ceil((this.resetTime - Date.now()) / 60000);
    
    return {
      requestsUsed: this.requestCount,
      requestsRemaining: this.maxRequests - this.requestCount,
      maxRequests: this.maxRequests,
      resetInMinutes: remainingTime
    };
  }
}

export default new ApiSportsService();
