import express from 'express';

const router = express.Router();

// ============================================
// MENSAJE DE PRÓXIMAMENTE
// ============================================

const comingSoonResponse = {
  success: true,
  message: 'Resultados en vivo próximamente',
  status: 'coming_soon',
  description: 'Estamos trabajando para traerte los mejores resultados de fútbol en tiempo real. Mientras tanto, disfruta de nuestro contenido exclusivo.',
  cta: {
    text: 'Visita nuestro blog',
    link: '/blog'
  },
  estimatedLaunch: '2025-Q1',
  features: [
    'Resultados en vivo',
    'Estadísticas detalladas',
    'Alineaciones',
    'Eventos del partido',
    'Clasificaciones'
  ]
};

// ============================================
// ENDPOINTS
// ============================================

// GET /api/fixtures/live
router.get('/live', (req, res) => {
  res.json({
    ...comingSoonResponse,
    endpoint: 'live',
    data: []
  });
});

// GET /api/fixtures/today
router.get('/today', (req, res) => {
  res.json({
    ...comingSoonResponse,
    endpoint: 'today',
    data: []
  });
});

// GET /api/fixtures/upcoming
router.get('/upcoming', (req, res) => {
  res.json({
    ...comingSoonResponse,
    endpoint: 'upcoming',
    data: []
  });
});

// GET /api/fixtures/stats
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    service: 'Coming Soon',
    status: 'development',
    message: 'El sistema de resultados estará disponible próximamente',
    lastUpdate: null,
    totalMatches: 0,
    availableFeatures: {
      blog: true,
      news: true,
      predictions: true,
      injuries: true,
      transfers: true
    }
  });
});

// GET /api/fixtures/:id
router.get('/:id', (req, res) => {
  res.json({
    ...comingSoonResponse,
    endpoint: 'match_details',
    matchId: req.params.id,
    data: null
  });
});

export default router;