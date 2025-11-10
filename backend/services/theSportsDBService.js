import axios from 'axios';
import cron from 'node-cron';
import Fixture from '../models/Fixture.js';

class TheSportsDBService {
  constructor() {
    this.baseUrl = 'https://www.thesportsdb.com/api/v1/json';
    this.apiKey = process.env.THESPORTSDB_API_KEY || '3'; // Default test key
    this.isRunning = false;
    this.stats = {
      totalUpdates: 0,
      lastUpdate: null,
      lastError: null,
      fixturesUpdated: 0,
      requestsThisMinute: 0,
      lastMinuteReset: Date.now()
    };
  }

  /**
   * Resetear contador de requests por minuto
   */
  resetMinuteCounter() {
    const now = Date.now();
    const elapsed = now - this.stats.lastMinuteReset;
    
    if (elapsed >= 60000) { // 1 minuto
      this.stats.requestsThisMinute = 0;
      this.stats.lastMinuteReset = now;
      console.log('🔄 Contador de requests reseteado (30 disponibles)');
    }
  }

  /**
   * Verificar si podemos hacer request
   */
  canMakeRequest() {
    this.resetMinuteCounter();
    return this.stats.requestsThisMinute < 30;
  }

  /**
   * Iniciar el bot
   */
  start() {
    console.log('🎾 TheSportsDB Bot iniciado');
    console.log('📡 Actualizaciones cada 15 minutos');
    console.log(`🔑 API Key: ${this.apiKey}`);

    // Ejecutar inmediatamente
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
   * Hacer request a TheSportsDB
   */
  async makeRequest(endpoint, params = {}) {
    if (!this.canMakeRequest()) {
      console.log('⏳ Límite por minuto alcanzado, esperando...');
      await new Promise(resolve => setTimeout(resolve, 60000));
      this.resetMinuteCounter();
    }

    try {
      const url = `${this.baseUrl}/${this.apiKey}${endpoint}`;
      console.log(`📡 Request a: ${url}`, params);

      const response = await axios.get(url, { 
        params,
        timeout: 15000 
      });

      this.stats.requestsThisMinute++;
      console.log(`✅ Response OK (${this.stats.requestsThisMinute}/30 este minuto)`);

      return response.data;
    } catch (error) {
      console.error(`❌ Error en request:`, error.message);
      return null;
    }
  }

  /**
   * Actualizar todos los datos
   */
  async updateAllData() {
    if (this.isRunning) {
      console.log('⏳ Actualización anterior en progreso...');
      return;
    }

    this.isRunning = true;
    const startTime = Date.now();

    try {
      console.log('🔄 [BOT] Iniciando actualización...');

      // 1️⃣ Obtener partidos en vivo de ligas principales
      const liveFixtures = await this.fetchLiveFixtures();
      await this.saveToDatabase('live_fixtures', liveFixtures);

      // 2️⃣ Obtener partidos del día de ligas principales
      const todayFixtures = await this.fetchTodayFixtures();
      await this.saveToDatabase('today_fixtures', todayFixtures);

      // 3️⃣ Obtener ligas principales
      const leagues = await this.fetchTopLeagues();
      await this.saveToDatabase('top_leagues', leagues);

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      this.stats.totalUpdates++;
      this.stats.lastUpdate = new Date();
      this.stats.fixturesUpdated = liveFixtures.length + todayFixtures.length;

      console.log(`✅ [BOT] Actualización completa en ${duration}s`);
      console.log(`📊 Partidos actualizados: ${this.stats.fixturesUpdated}`);

    } catch (error) {
      console.error('❌ [BOT] Error:', error.message);
      this.stats.lastError = error.message;
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Obtener partidos en vivo de las principales ligas
   */
  async fetchLiveFixtures() {
    console.log('📡 Obteniendo partidos en vivo...');
    
    // IDs de ligas principales en TheSportsDB
    const mainLeagues = [
      4328, // English Premier League
      4335, // Spanish La Liga
      4332, // Italian Serie A
      4331, // German Bundesliga
      4334, // French Ligue 1
      4480, // UEFA Champions League
      4481, // UEFA Europa League
      4424, // Liga MX
    ];

    let allLiveFixtures = [];

    for (const leagueId of mainLeagues) {
      if (!this.canMakeRequest()) {
        console.log('⏳ Pausando para respetar límite...');
        break;
      }

      const data = await this.makeRequest('/eventsnextleague.php', { id: leagueId });
      
      if (data && data.events) {
        // Filtrar solo partidos en vivo (InPlay)
        const liveEvents = data.events.filter(event => {
          return event.strStatus === 'InPlay' || 
                 event.strStatus === '1H' || 
                 event.strStatus === '2H' ||
                 event.strStatus === 'HT';
        });

        if (liveEvents.length > 0) {
          console.log(`✅ ${liveEvents.length} partidos en vivo en liga ${leagueId}`);
          allLiveFixtures = [...allLiveFixtures, ...this.transformEvents(liveEvents)];
        }
      }

      // Pequeña pausa entre requests
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log(`📊 Total partidos en vivo: ${allLiveFixtures.length}`);
    return allLiveFixtures;
  }

  /**
   * Obtener partidos del día
   */
  async fetchTodayFixtures() {
    const today = new Date().toISOString().split('T')[0];
    console.log(`📡 Obteniendo partidos del ${today}...`);

    const mainLeagues = [4328, 4335, 4332, 4331, 4334, 4480, 4481, 4424];
    let allTodayFixtures = [];

    for (const leagueId of mainLeagues) {
      if (!this.canMakeRequest()) break;

      const data = await this.makeRequest('/eventsnextleague.php', { id: leagueId });
      
      if (data && data.events) {
        // Filtrar eventos de hoy
        const todayEvents = data.events.filter(event => {
          const eventDate = event.dateEvent;
          return eventDate === today;
        });

        if (todayEvents.length > 0) {
          console.log(`✅ ${todayEvents.length} partidos hoy en liga ${leagueId}`);
          allTodayFixtures = [...allTodayFixtures, ...this.transformEvents(todayEvents)];
        }
      }

      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log(`📊 Total partidos hoy: ${allTodayFixtures.length}`);
    return allTodayFixtures;
  }

  /**
   * Obtener ligas principales
   */
  async fetchTopLeagues() {
    console.log('📡 Obteniendo ligas principales...');
    
    const data = await this.makeRequest('/all_leagues.php');
    
    if (data && data.leagues) {
      const mainLeagueIds = [4328, 4335, 4332, 4331, 4334, 4480, 4481, 4424];
      const filtered = data.leagues.filter(l => mainLeagueIds.includes(parseInt(l.idLeague)));
      console.log(`✅ ${filtered.length} ligas principales obtenidas`);
      return filtered;
    }

    return [];
  }

  /**
   * Transformar eventos de TheSportsDB al formato de API-Sports
   */
  transformEvents(events) {
    return events.map(event => ({
      fixture: {
        id: parseInt(event.idEvent),
        referee: event.strReferee || null,
        timezone: 'UTC',
        date: `${event.dateEvent}T${event.strTime || '00:00:00'}+00:00`,
        timestamp: new Date(`${event.dateEvent}T${event.strTime || '00:00:00'}`).getTime() / 1000,
        venue: {
          id: parseInt(event.idVenue) || null,
          name: event.strVenue || null,
          city: event.strCity || null
        },
        status: {
          long: this.getStatusLong(event.strStatus),
          short: this.getStatusShort(event.strStatus),
          elapsed: this.getElapsedTime(event.strProgress)
        }
      },
      league: {
        id: parseInt(event.idLeague),
        name: event.strLeague,
        country: event.strCountry,
        logo: event.strLeagueBadge,
        flag: event.strCountry ? `https://flagcdn.com/w80/${this.getCountryCode(event.strCountry)}.png` : null,
        season: parseInt(event.strSeason) || new Date().getFullYear(),
        round: event.intRound ? `Round ${event.intRound}` : 'Regular Season'
      },
      teams: {
        home: {
          id: parseInt(event.idHomeTeam),
          name: event.strHomeTeam,
          logo: event.strHomeTeamBadge,
          winner: this.getWinner(event, 'home')
        },
        away: {
          id: parseInt(event.idAwayTeam),
          name: event.strAwayTeam,
          logo: event.strAwayTeamBadge,
          winner: this.getWinner(event, 'away')
        }
      },
      goals: {
        home: parseInt(event.intHomeScore) || 0,
        away: parseInt(event.intAwayScore) || 0
      },
      score: {
        halftime: {
          home: parseInt(event.intHomeScore) || 0,
          away: parseInt(event.intAwayScore) || 0
        },
        fulltime: {
          home: parseInt(event.intHomeScore) || null,
          away: parseInt(event.intAwayScore) || null
        },
        extratime: {
          home: null,
          away: null
        },
        penalty: {
          home: null,
          away: null
        }
      }
    }));
  }

  /**
   * Helper: Obtener status largo
   */
  getStatusLong(status) {
    const statusMap = {
      'NS': 'Not Started',
      'InPlay': 'In Play',
      '1H': 'First Half',
      'HT': 'Halftime',
      '2H': 'Second Half',
      'FT': 'Match Finished',
      'AET': 'Match Finished After Extra Time',
      'PEN': 'Match Finished After Penalty'
    };
    return statusMap[status] || 'Not Started';
  }

  /**
   * Helper: Obtener status corto
   */
  getStatusShort(status) {
    return status || 'NS';
  }

  /**
   * Helper: Obtener tiempo transcurrido
   */
  getElapsedTime(progress) {
    if (!progress) return null;
    const match = progress.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  }

  /**
   * Helper: Determinar ganador
   */
  getWinner(event, team) {
    if (event.strStatus !== 'FT') return null;
    const homeScore = parseInt(event.intHomeScore) || 0;
    const awayScore = parseInt(event.intAwayScore) || 0;
    
    if (homeScore === awayScore) return null;
    if (team === 'home') return homeScore > awayScore;
    return awayScore > homeScore;
  }

  /**
   * Helper: Código de país
   */
  getCountryCode(country) {
    const codes = {
      'England': 'gb-eng',
      'Spain': 'es',
      'Italy': 'it',
      'Germany': 'de',
      'France': 'fr',
      'Mexico': 'mx'
    };
    return codes[country] || 'un';
  }

  /**
   * Guardar en MongoDB
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
   * Actualización completa nocturna
   */
  async fullDatabaseRefresh() {
    console.log('🌙 Actualización completa...');
    await this.updateAllData();
    
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    await Fixture.deleteMany({ updatedAt: { $lt: sevenDaysAgo } });
    
    console.log('✅ Actualización completa terminada');
  }

  /**
   * Obtener estadísticas
   */
  getStats() {
    return {
      ...this.stats,
      isRunning: this.isRunning,
      nextUpdate: this.getNextUpdateTime(),
      requestsPerMinute: `${this.stats.requestsThisMinute}/30`
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

export default new TheSportsDBService();