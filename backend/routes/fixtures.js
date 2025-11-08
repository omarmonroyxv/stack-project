import express from 'express';
import fixturesController from '../controllers/fixturesController.js';

const router = express.Router();

// Rutas de fixtures
router.get('/live', fixturesController.getLiveFixtures);
router.get('/today', fixturesController.getTodayFixtures);
router.get('/leagues', fixturesController.getTopLeagues);
router.get('/standings', fixturesController.getStandings);
router.get('/stats', fixturesController.getApiStats);
router.get('/:id', fixturesController.getFixtureById); // Esta debe ir al final
router.get('/freshness', fixturesController.getDataFreshness);

export default router;