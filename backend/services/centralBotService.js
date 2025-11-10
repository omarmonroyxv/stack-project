import cron from 'node-cron';
import axios from 'axios';
import Fixture from '../models/Fixture.js';
import { config } from '../config/config.js';

class CentralBotService {
  constructor() {
    this.baseUrl = config.apiSports.baseUrl;
    this.apiKey = config.apiSports.key;
    this.host = config.apiSports.host;
    this.isRunning = false;
    this.stats = {
      totalUpdates: 0,
      lastUpdate: null,
      lastError: null,
      fixturesUpdated: 0
    };
  }

  /**
   * Iniciar el bot que actualiza cada 15 minutos
   */
  start() {
    console.log('🤖 Bot Central iniciado');
    console.log('📡 Actualizaciones cada 15 minutos');
    console.log(`🔑 API Key configured: ${this.apiKey ? 'YES' : 'NO'}`);
    console.log(`🔑 API Key (últimos 4): ...${this.apiKey ? this.apiKey.slice(-4) : 'N/A'}`);

    // Ejecutar inmediatamente al iniciar
    this.updateAllData();

    // Cron: cada 15 minutos
    cron.schedule('*/15 * * * *', () => {
      this.updateAllData();
    });

    // Actualización nocturna completa (3 AM)
    cron.schedule('0 3 * * *', () => {
      console.log('🌙 Actualización nocturna completa');
      this.fullDatabaseRefresh();
    });
  }

  /**
   * Actualizar todos los datos importantes
   */
  async updateAllData() {
    if (this.isRunning) {
      console.log('⏳ Actualización anterior aún en progreso...');
      return;
    }

    this.isRunning = true;
    const startTime = Date.now();

    try {
      console.log('🔄 [BOT] Iniciando actualización de datos...');

      // 1️⃣ Actualizar partidos en vivo (PRIORIDAD)
      const liveFixtures = await this.fetchLiveFixtures();
      await this.saveToDatabase('live_fixtures', liveFixtures);
      
      // 2️⃣ Actualizar partidos del día
      const todayFixtures = await this.fetchTodayFixtures();
      await this.saveToDatabase('today_fixtures', todayFixtures);

      // 3️⃣ Actualizar ligas principales (solo 1 vez al día)
      if (this.shouldUpdateLeagues()) {
        const leagues = await this.fetchTopLeagues();
        await this.saveToDatabase('top_leagues', leagues);
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      this.stats.totalUpdates++;
      this.stats.lastUpdate = new Date();
      this.stats.fixturesUpdated = liveFixtures.length + todayFixtures.length;

      console.log(`✅ [BOT] Actualización completa en ${duration}s`);
      console.log(`📊 Partidos actualizados: ${this.stats.fixturesUpdated}`);

    } catch (error) {
      console.error('❌ [BOT] Error en actualización:', error.message);
      this.stats.lastError = error.message;
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Hacer request a API-Sports CON LOGS DETALLADOS
   */
  async makeAPIRequest(endpoint, params = {}) {
    try {
      console.log(`📡 Haciendo request a: ${this.baseUrl}${endpoint}`);
      console.log(`📋 Params:`, JSON.stringify(params));
      console.log(`🔑 API Key presente: ${this.apiKey ? 'SÍ' : 'NO'}`);
      console.log(`🔑 Host: ${this.host}`);
      
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': this.host
        },
        params,
        timeout: 15000
      });

      console.log(`✅ Response status: ${response.status}`);
      console.log(`📦 Response data exists: ${response.data ? 'YES' : 'NO'}`);
      console.log(`📦 Response.response length: ${response.data?.response?.length || 0}`);
      console.log(`📦 Response.results: ${response.data?.results || 0}`);

      // Verificar si hay errores en la respuesta
      if (response.data?.errors && Object.keys(response.data.errors).length > 0) {
        console.error('❌ API Errors:', JSON.stringify(response.data.errors));
      }

      // Verificar si la API devolvió mensaje
      if (response.data?.message) {
        console.log(`💬 API Message: ${response.data.message}`);
      }

      // Log completo de la respuesta para debugging
      console.log(`📄 Full response:`, JSON.stringify(response.data, null, 2).substring(0, 500));

      return response.data?.response || [];
    } catch (error) {
      console.error(`❌ Error API (${endpoint}):`, error.message);
      if (error.response) {
        console.error('❌ Response status:', error.response.status);
        console.error('❌ Response data:', JSON.stringify(error.response.data));
      }
      if (error.code) {
        console.error('❌ Error code:', error.code);
      }
      return [];
    }
  }

  /**
   * Obtener partidos en vivo
   */
  async fetchLiveFixtures() {
    console.log('📡 Obteniendo partidos en vivo desde API-Sports...');
    const fixtures = await this.makeAPIRequest('/fixtures', { live: 'all' });
    
    console.log(`📊 Fixtures recibidos: ${fixtures.length}`);
    
    if (fixtures && fixtures.length > 0) {
      console.log(`✅ ${fixtures.length} partidos en vivo obtenidos de API-Sports`);
      // Log del primer partido para verificar estructura
      console.log(`📝 Primer partido (sample):`, JSON.stringify(fixtures[0], null, 2).substring(0, 300));
      return fixtures;
    }
    
    console.log('⚠️ No hay partidos en vivo en este momento');
    return [];
  }

  /**
   * Obtener partidos del día
   */
  async fetchTodayFixtures() {
    const today = new Date().toISOString().split('T')[0];
    console.log(`📡 Obteniendo partidos del ${today}...`);
    const fixtures = await this.makeAPIRequest('/fixtures', { date: today });
    console.log(`✅ ${fixtures.length} partidos del día obtenidos`);
    
    if (fixtures.length > 0) {
      console.log(`📝 Primer partido del día (sample):`, JSON.stringify(fixtures[0]?.league?.name || 'N/A'));
    }
    
    return fixtures;
  }

  /**
   * Obtener ligas principales
   */
  async fetchTopLeagues() {
    console.log('📡 Obteniendo ligas principales...');
    const leagues = await this.makeAPIRequest('/leagues', {
      current: true,
      season: new Date().getFullYear()
    });
    
    const mainLeagueIds = [39, 140, 135, 78, 61, 2, 3, 848, 128, 71];
    const filtered = leagues.filter(l => mainLeagueIds.includes(l.league?.id));
    
    console.log(`✅ ${filtered.length} ligas principales obtenidas`);
    return filtered;
  }

  /**
   * Guardar datos en MongoDB
   */
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

  /**
   * Verificar si necesita actualizar ligas (1 vez al día)
   */
  shouldUpdateLeagues() {
    const lastUpdate = this.stats.lastUpdate;
    if (!lastUpdate) return true;

    const hoursSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60);
    return hoursSinceUpdate >= 24;
  }

  /**
   * Actualización completa nocturna
   */
  async fullDatabaseRefresh() {
    console.log('🌙 Iniciando actualización completa...');
    
    await this.updateAllData();
    
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    await Fixture.deleteMany({ updatedAt: { $lt: sevenDaysAgo } });
    
    console.log('✅ Actualización completa y limpieza terminada');
  }

  /**
   * Obtener estadísticas del bot
   */
  getStats() {
    return {
      ...this.stats,
      isRunning: this.isRunning,
      nextUpdate: this.getNextUpdateTime(),
      requestsPerDay: 96
    };
  }

  getNextUpdateTime() {
    const now = new Date();
    const minutes = now.getMinutes();
    const nextQuarter = Math.ceil(minutes / 15) * 15;
    const next = new Date(now);
    next.setMinutes(nextQuarter, 0, 0);
    return next;
  }
}

export default new CentralBotService();