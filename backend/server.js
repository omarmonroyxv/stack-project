import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import dotenv from 'dotenv';

// Routes
import fixturesRouter from './routes/fixtures.js';
import blogRouter from './routes/blog.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE
// ============================================

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 requests por ventana
});
app.use('/api/', limiter);

// ============================================
// MONGODB CONNECTION
// ============================================

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// ============================================
// REDIS CONNECTION (OPCIONAL - PARA CACHÉ)
// ============================================

let redisClient = null;

const connectRedis = async () => {
  if (!process.env.REDIS_URL) {
    console.log('⚠️  Redis no configurado - continuando sin caché');
    return;
  }

  try {
    redisClient = createClient({
      url: process.env.REDIS_URL
    });

    redisClient.on('error', (err) => {
      console.error('❌ Error de Redis:', err);
    });

    await redisClient.connect();
    console.log('✅ Redis conectado');
  } catch (error) {
    console.error('⚠️  Redis no disponible - continuando sin caché');
  }
};

// ============================================
// ROUTES
// ============================================

app.use('/api/fixtures', fixturesRouter);
app.use('/api/blog', blogRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Stack API running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Stack API - Football Content Platform',
    version: '2.0.0',
    endpoints: {
      health: '/api/health',
      blog: '/api/blog',
      fixtures: '/api/fixtures (coming soon)'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// ============================================
// SERVER START
// ============================================

const startServer = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();
    
    // Conectar a Redis (opcional)
    await connectRedis();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📝 Modo: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 API disponible en: http://localhost:${PORT}/api\n`);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
};

startServer();

// Manejo de errores no capturados
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
});