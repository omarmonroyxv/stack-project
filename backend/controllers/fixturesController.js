import apiSportsService from '../services/apiSportsService.js';
import scrapingService from '../services/scrapingService.js';

class FixturesController {
  // Obtener partidos en vivo con fallback a scraping
  async getLiveMatches(req, res) {
    try {
      // Intentar obtener de API Sports primero
      let matches = await apiSportsService.getLiveMatches();

      // Si no hay datos de la API, usar scraping
      if (!matches || matches.length === 0) {
        console.log('⚠️ No hay datos de API, usando scraping...');
        const scrapedMatches = await scrapingService.getScrapedMatches();
        
        return res.json({
          success: true,
          source: 'scraping',
          data: scrapedMatches,
          message: 'Datos obtenidos mediante scraping'
        });
      }

      res.json({
        success: true,
        source: 'api',
        data: matches,
        apiStats: apiSportsService.getStats()
      });

    } catch (error) {
      console.error('Error obteniendo partidos en vivo:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo partidos en vivo'
      });
    }
  }

  // Obtener fixtures del día
  async getTodayFixtures(req, res) {
    try {
      const fixtures = await apiSportsService.getTodayFixtures();

      res.json({
        success: true,
        data: fixtures,
        apiStats: apiSportsService.getStats()
      });

    } catch (error) {
      console.error('Error obteniendo fixtures de hoy:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo fixtures'
      });
    }
  }

  // Obtener detalles de un partido específico
  async getFixtureById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'ID de fixture requerido'
        });
      }

      const fixture = await apiSportsService.getFixtureById(id);

      if (!fixture) {
        return res.status(404).json({
          success: false,
          error: 'Fixture no encontrado'
        });
      }

      res.json({
        success: true,
        data: fixture
      });

    } catch (error) {
      console.error('Error obteniendo fixture:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo detalles del fixture'
      });
    }
  }

  // Obtener fixtures por fecha
  async getFixturesByDate(req, res) {
    try {
      const { date } = req.params;
      
      // Validar formato de fecha (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        return res.status(400).json({
          success: false,
          error: 'Formato de fecha inválido. Use YYYY-MM-DD'
        });
      }

      const fixtures = await apiSportsService.getTodayFixtures();

      res.json({
        success: true,
        data: fixtures
      });

    } catch (error) {
      console.error('Error obteniendo fixtures por fecha:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo fixtures'
      });
    }
  }

  // Obtener ligas principales
  async getMainLeagues(req, res) {
    try {
      const leagues = await apiSportsService.getMainLeagues();

      res.json({
        success: true,
        data: leagues
      });

    } catch (error) {
      console.error('Error obteniendo ligas:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo ligas'
      });
    }
  }

  // Obtener clasificación de una liga
  async getStandings(req, res) {
    try {
      const { leagueId, season } = req.query;

      if (!leagueId || !season) {
        return res.status(400).json({
          success: false,
          error: 'leagueId y season son requeridos'
        });
      }

      const standings = await apiSportsService.getStandings(leagueId, season);

      if (!standings) {
        return res.status(404).json({
          success: false,
          error: 'Clasificación no encontrada'
        });
      }

      res.json({
        success: true,
        data: standings
      });

    } catch (error) {
      console.error('Error obteniendo clasificación:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo clasificación'
      });
    }
  }

  // Obtener estadísticas de uso de la API
  async getApiStats(req, res) {
    try {
      const stats = apiSportsService.getStats();

      res.json({
        success: true,
        data: stats
      });

    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo estadísticas'
      });
    }
  }
}

export default new FixturesController();
