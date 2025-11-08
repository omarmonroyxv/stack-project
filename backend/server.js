import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import cron from 'node-cron';

import { config } from './config/config.js';
import cacheService from './services/cacheService.js';
import scrapingService from './services/scrapingService.js';

import fixturesRoutes from './routes/fixtures.js';
import blogRoutes from './routes/blog.js';

const app = express();

// CORS Configuration
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      process.env.FRONTEND_URL,
      'https://stack-frontend.onrender.com',
      /\.onrender\.com$/  // Permite cualquier subdominio de onrender.com
    ]
  : ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como Postman, curl, etc)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middlewares de seguridad
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: config.cors.origin,
  credentials: true
}));

// Rate limiting general
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de requests
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.'
});
app.use('/api/', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/fixtures', fixturesRoutes);
app.use('/api/blog', blogRoutes);

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Stack API - Resultados de fútbol en vivo',
    version: '1.0.0',
    endpoints: {
      fixtures: '/api/fixtures',
      blog: '/api/blog',
      health: '/api/health'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor'
  });
});

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodb.uri);
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    // En desarrollo, continuar sin MongoDB
    if (config.nodeEnv === 'production') {
      process.exit(1);
    }
  }
};

// Inicializar servicios
const initializeServices = async () => {
  console.log('✅ Servicios inicializados');
};

// Configurar cron jobs para scraping automático
const setupCronJobs = () => {
  // Scraping cada 5 minutos (puedes ajustar según necesites)
  const scrapingInterval = `*/${config.rateLimiting.scrapingIntervalMinutes} * * * *`;
  
  cron.schedule(scrapingInterval, async () => {
    console.log('🕷️ Ejecutando scraping programado...');
    await scrapingService.getScrapedMatches();
  });

  console.log(`✅ Cron job configurado: scraping cada ${config.rateLimiting.scrapingIntervalMinutes} minutos`);
};

// Iniciar servidor
const startServer = async () => {
  try {
    await connectDB();
    await initializeServices();
    setupCronJobs();

    app.listen(config.port, () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🚀 Stack API corriendo en puerto ${config.port}`);
      console.log(`📍 Entorno: ${config.nodeEnv}`);
      console.log(`🌐 URL: http://localhost:${config.port}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });

  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
};

// Manejo de señales de terminación
process.on('SIGTERM', async () => {
  console.log('SIGTERM recibido. Cerrando servidor...');
  await cacheService.disconnect();
  await mongoose.connection.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\nSIGINT recibido. Cerrando servidor...');
  await cacheService.disconnect();
  await mongoose.connection.close();
  process.exit(0);
});

// Iniciar aplicación
startServer();
