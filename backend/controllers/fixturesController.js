import fixtureDataService from '../services/fixtureDataService.js';
import theSportsDBService from '../services/theSportsDBService.js';

/**
 * Controller actualizado para TheSportsDB
 */

// Obtener partidos en vivo
const getLiveFixtures = async (req, res) => {
  try {
    const result = await fixtureDataService.getLiveFixtures();
    
    res.json({
      success: true,
      data: result.data || [],
      source: result.source || 'thesportsdb',
      cached: result.cached || false,
      lastUpdate: result.lastUpdate,
      timestamp: result.timestamp
    });
  } catch (error) {
    console.error('Error obteniendo partidos en vivo:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo partidos en vivo',
      data: []
    });
  }
};

// Obtener partidos del día
const getTodayFixtures = async (req, res) => {
  try {
    const result = await fixtureDataService.getTodayFixtures();
    
    res.json({
      success: true,
      data: result.data || [],
      source: result.source || 'thesportsdb',
      cached: result.cached || false,
      lastUpdate: result.lastUpdate
    });
  } catch (error) {
    console.error('Error obteniendo partidos del día:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo partidos del día',
      data: []
    });
  }
};

// Obtener detalle de un partido
const getFixtureById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await fixtureDataService.getFixtureById(id);
    
    res.json({
      success: true,
      ...result
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
    const result = await fixtureDataService.getTopLeagues();
    
    res.json({
      success: true,
      ...result
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

    const result = await fixtureDataService.getStandings(league, season);
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error obteniendo tabla de posiciones:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo tabla de posiciones'
    });
  }
};

// Obtener estadísticas del sistema
const getApiStats = async (req, res) => {
  try {
    const systemStats = await fixtureDataService.getSystemStats();
    const botStats = theSportsDBService.getStats();
    
    res.json({
      success: true,
      system: systemStats,
      bot: botStats,
      service: 'TheSportsDB',
      limits: {
        requestsPerMinute: 30,
        requestsPerDay: 43200,
        resetInterval: '60 seconds'
      },
      architecture: 'TheSportsDB Bot + MongoDB Cache',
      message: 'Usando TheSportsDB - 30 requests/minuto'
    });
  } catch (error) {
    console.error('Error obteniendo stats:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo estadísticas'
    });
  }
};

// Obtener frescura de los datos
const getDataFreshness = async (req, res) => {
  try {
    const freshness = await fixtureDataService.getDataFreshness();
    
    res.json({
      success: true,
      ...freshness,
      service: 'TheSportsDB'
    });
  } catch (error) {
    console.error('Error obteniendo freshness:', error);
    res.status(500).json({
      success: false,
      error: 'Error obteniendo información de actualización'
    });
  }
};

export default {
  getLiveFixtures,
  getTodayFixtures,
  getFixtureById,
  getTopLeagues,
  getStandings,
  getApiStats,
  getDataFreshness
};