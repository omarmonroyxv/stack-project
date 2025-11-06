import express from 'express';
import fixturesController from '../controllers/fixturesController.js';

const router = express.Router();

// Rutas de fixtures
router.get('/live', fixturesController.getLiveMatches);
router.get('/today', fixturesController.getTodayFixtures);
router.get('/leagues', fixturesController.getMainLeagues);
router.get('/standings', fixturesController.getStandings);
router.get('/stats', fixturesController.getApiStats);
router.get('/:id', fixturesController.getFixtureById);
router.get('/date/:date', fixturesController.getFixturesByDate);

export default router;
