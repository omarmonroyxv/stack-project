import apiSportsService from '../services/apiSportsService.js';
import cacheService from '../services/cacheService.js';

// Obtener partidos en vivo
const getLiveFixtures = async (req, res) => {
  try {
    const cacheKey = 'live-fixtures';
    
    // Intentar obtener del cache
    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        cached: true,
        data: cachedData
      });
    }

    // Si no está en cache, obtener de la API
    const fixtures = await apiSportsService.getLiveFixtures();
    
    // Guardar en cache por 2 minutos
    await cacheService.set(cacheKey, fixtures, 120);
    
    res.json({
      success: true,
      cached: false,
      data: fixtures
    });
  } catch (error) {
    console.error('Error obteniendo partidos en vivo:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo partidos en vivo'
    });
  }
};

// Obtener partidos del día
const getTodayFixtures = async (req, res) => {
  try {
    const cacheKey = 'today-fixtures';
    
    // Intentar obtener del cache
    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        cached: true,
        data: cachedData
      });
    }

    // Si no está en cache, obtener de la API
    const fixtures = await apiSportsService.getTodayFixtures();
    
    // Guardar en cache por 10 minutos
    await cacheService.set(cacheKey, fixtures, 600);
    
    res.json({
      success: true,
      cached: false,
      data: fixtures
    });
  } catch (error) {
    console.error('Error obteniendo partidos del día:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo partidos del día'
    });
  }
};

// Obtener detalle de un partido
const getFixtureById = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `fixture-${id}`;
    
    // Intentar obtener del cache
    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        cached: true,
        data: cachedData
      });
    }

    // Si no está en cache, obtener de la API
    const fixture = await apiSportsService.getFixtureById(id);
    
    // Guardar en cache por 5 minutos
    await cacheService.set(cacheKey, fixture, 300);
    
    res.json({
      success: true,
      cached: false,
      data: fixture
    });
  } catch (error) {
    console.error('Error obteniendo partido:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo partido'
    });
  }
};

// Obtener ligas principales
const getTopLeagues = async (req, res) => {
  try {
    const cacheKey = 'top-leagues';
    
    // Intentar obtener del cache
    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        cached: true,
        data: cachedData
      });
    }

    // Si no está en cache, obtener de la API
    const leagues = await apiSportsService.getTopLeagues();
    
    // Guardar en cache por 24 horas (las ligas no cambian frecuentemente)
    await cacheService.set(cacheKey, leagues, 86400);
    
    res.json({
      success: true,
      cached: false,
      data: leagues
    });
  } catch (error) {
    console.error('Error obteniendo ligas:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo ligas'
    });
  }
};

// Obtener tabla de posiciones
const getStandings = async (req, res) => {
  try {
    const { league, season } = req.query;
    
    if (!league || !season) {
      return res.status(400).json({
        success: false,
        error: 'Se requiere league y season'
      });
    }

    const cacheKey = `standings-${league}-${season}`;
    
    // Intentar obtener del cache
    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        cached: true,
        data: cachedData
      });
    }

    // Si no está en cache, obtener de la API
    const standings = await apiSportsService.getStandings(league, season);
    
    // Guardar en cache por 1 hora
    await cacheService.set(cacheKey, standings, 3600);
    
    res.json({
      success: true,
      cached: false,
      data: standings
    });
  } catch (error) {
    console.error('Error obteniendo tabla de posiciones:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo tabla de posiciones'
    });
  }
};

// Obtener estadísticas de uso de la API
const getApiStats = async (req, res) => {
  try {
    const stats = await apiSportsService.getApiStats();
    
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error obteniendo stats:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo estadísticas'
    });
  }
};

export default {
  getLiveFixtures,
  getTodayFixtures,
  getFixtureById,
  getTopLeagues,
  getStandings,
  getApiStats
};