import express from 'express';
import fixturesController from '../controllers/fixturesController.js';
import scrapingService from '../services/scrapingService.js';

const router = express.Router();

// Rutas normales
router.get('/live', fixturesController.getLiveFixtures);
router.get('/today', fixturesController.getTodayFixtures);
router.get('/leagues', fixturesController.getTopLeagues);
router.get('/standings', fixturesController.getStandings);
router.get('/stats', fixturesController.getApiStats);
router.get('/freshness', fixturesController.getDataFreshness);
router.get('/:id', fixturesController.getFixtureById);

// 🔥 Endpoint para forzar actualización del bot de scraping
router.post('/force-update', async (req, res) => {
  try {
    console.log('🔥 Actualización manual forzada (Scraping)');
    await scrapingService.updateAllData();
    
    res.json({
      success: true,
      message: 'Actualización completada con Web Scraping',
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error en actualización forzada:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Endpoint para obtener stats del bot
router.get('/bot-stats', (req, res) => {
  const stats = scrapingService.getStats();
  res.json({
    success: true,
    service: 'Web Scraping',
    ...stats
  });
});

export default router;