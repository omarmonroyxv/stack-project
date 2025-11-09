import express from 'express';
import fixturesController from '../controllers/fixturesController.js';
import centralBot from '../services/centralBotService.js';

const router = express.Router();

// Rutas normales
router.get('/live', fixturesController.getLiveFixtures);
router.get('/today', fixturesController.getTodayFixtures);
router.get('/leagues', fixturesController.getTopLeagues);
router.get('/standings', fixturesController.getStandings);
router.get('/stats', fixturesController.getApiStats);
router.get('/freshness', fixturesController.getDataFreshness);
router.get('/:id', fixturesController.getFixtureById);

// 🔥 NUEVO: Endpoint para forzar actualización del bot
router.post('/force-update', async (req, res) => {
  try {
    console.log('🔥 Actualización manual forzada');
    await centralBot.updateAllData();
    
    res.json({
      success: true,
      message: 'Actualización completada',
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
  const stats = centralBot.getStats();
  res.json({
    success: true,
    ...stats
  });
});

export default router;