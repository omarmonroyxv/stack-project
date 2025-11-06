# 💻 EJEMPLOS DE CÓDIGO Y SNIPPETS - STACK

## 📝 Crear Posts de Blog

### Ejemplo completo de post
```bash
curl -X POST http://localhost:5000/api/blog/admin/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Real Madrid vence al Barcelona en El Clásico",
    "slug": "real-madrid-vence-barcelona-clasico",
    "content": "En un partido emocionante...",
    "excerpt": "El Real Madrid se impone 3-2 al Barcelona",
    "coverImage": "https://example.com/image.jpg",
    "category": "noticias",
    "tags": ["la-liga", "real-madrid", "barcelona", "el-clasico"],
    "author": {
      "name": "Juan Pérez",
      "avatar": "https://example.com/avatar.jpg"
    },
    "published": true,
    "featured": true,
    "metaTitle": "Real Madrid vence 3-2 al Barcelona",
    "metaDescription": "Resumen y análisis del Clásico...",
    "metaKeywords": ["futbol", "la liga", "real madrid"]
  }'
```

### Posts de ejemplo para poblar el blog
```bash
# Post 1 - Noticia
curl -X POST http://localhost:5000/api/blog/admin/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lionel Messi gana su octavo Balón de Oro",
    "content": "Lionel Messi ha sido galardonado con su octavo Balón de Oro, consolidándose como el jugador con más galardones individuales en la historia del fútbol. El astro argentino se impuso en una ceremonia celebrada en París...",
    "excerpt": "Messi recibe su octavo Balón de Oro en ceremonia en París",
    "category": "noticias",
    "tags": ["messi", "balon-de-oro", "premios"],
    "published": true,
    "featured": true
  }'

# Post 2 - Análisis
curl -X POST http://localhost:5000/api/blog/admin/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Análisis táctico: El 4-3-3 del Manchester City",
    "content": "El Manchester City de Pep Guardiola ha perfeccionado el sistema 4-3-3 hasta convertirlo en una máquina de dominio absoluto. En este análisis profundizamos en las claves tácticas...",
    "excerpt": "Desglose táctico del exitoso sistema de Guardiola",
    "category": "analisis",
    "tags": ["tactica", "manchester-city", "guardiola"],
    "published": true
  }'

# Post 3 - Opinión
curl -X POST http://localhost:5000/api/blog/admin/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "¿Es el VAR beneficioso para el fútbol?",
    "content": "Desde su implementación, el VAR ha generado debates apasionados. Mientras algunos lo ven como una herramienta de justicia, otros argumentan que rompe la esencia del juego...",
    "excerpt": "Reflexión sobre el impacto del VAR en el fútbol moderno",
    "category": "opinion",
    "tags": ["var", "arbitraje", "tecnologia"],
    "published": true
  }'
```

## 🔍 Consultas a la API

### Obtener partidos en vivo
```javascript
// JavaScript/TypeScript
const getLiveMatches = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/fixtures/live');
    const data = await response.json();
    
    if (data.success) {
      console.log('Partidos en vivo:', data.data);
      console.log('Fuente:', data.source); // 'api' o 'scraping'
      
      if (data.apiStats) {
        console.log('Requests usados:', data.apiStats.requestsUsed);
        console.log('Requests restantes:', data.apiStats.requestsRemaining);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Obtener fixtures de hoy con filtros
```javascript
const getTodayFixtures = async (leagueId) => {
  const url = new URL('http://localhost:5000/api/fixtures/today');
  if (leagueId) {
    url.searchParams.append('league', leagueId);
  }
  
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};
```

### Búsqueda en el blog
```javascript
const searchPosts = async (query, category = '') => {
  const params = new URLSearchParams({
    search: query,
    page: 1,
    limit: 10
  });
  
  if (category) {
    params.append('category', category);
  }
  
  const response = await fetch(
    `http://localhost:5000/api/blog/posts?${params}`
  );
  const data = await response.json();
  
  return {
    posts: data.data,
    total: data.pagination.total,
    pages: data.pagination.pages
  };
};
```

## 🎨 Componentes React Personalizados

### Hook personalizado para partidos en vivo
```javascript
// hooks/useLiveMatches.js
import { useState, useEffect } from 'react';
import { fixturesApi } from '../lib/api';

export function useLiveMatches(refreshInterval = 30000) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('api');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fixturesApi.getLive();
        if (res.data.success) {
          setMatches(res.data.data);
          setSource(res.data.source);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
    const interval = setInterval(fetchMatches, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { matches, loading, error, source };
}

// Uso en componente:
function LiveMatchesPage() {
  const { matches, loading, source } = useLiveMatches();

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <p>Fuente: {source}</p>
      {matches.map(match => (
        <MatchCard key={match.fixture.id} match={match} />
      ))}
    </div>
  );
}
```

### Componente de contador de goles animado
```javascript
// components/GoalCounter.jsx
import { motion } from 'framer-motion';

export function GoalCounter({ goals, team }) {
  return (
    <motion.div
      className="text-4xl font-bold"
      key={goals} // Cambia la key para forzar animación
      initial={{ scale: 1.5, color: '#ef4444' }}
      animate={{ scale: 1, color: '#111827' }}
      transition={{ duration: 0.5 }}
    >
      {goals}
    </motion.div>
  );
}
```

### Badge de estado en vivo con animación
```javascript
// components/LiveBadge.jsx
export function LiveBadge({ status, elapsed }) {
  const isLive = ['1H', '2H', 'HT', 'ET', 'P'].includes(status);

  if (!isLive) return null;

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
      <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
      EN VIVO {elapsed && `${elapsed}'`}
    </span>
  );
}
```

## 🔧 Utilidades Backend

### Middleware de logging personalizado
```javascript
// middleware/logger.js
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

// Uso en server.js
import { requestLogger } from './middleware/logger.js';
app.use(requestLogger);
```

### Validador de datos
```javascript
// utils/validators.js
export const validatePost = (data) => {
  const errors = [];

  if (!data.title || data.title.length < 5) {
    errors.push('El título debe tener al menos 5 caracteres');
  }

  if (!data.content || data.content.length < 50) {
    errors.push('El contenido debe tener al menos 50 caracteres');
  }

  if (!data.excerpt || data.excerpt.length > 300) {
    errors.push('El extracto no debe exceder 300 caracteres');
  }

  const validCategories = ['noticias', 'analisis', 'entrevistas', 'opinion', 'highlights'];
  if (!validCategories.includes(data.category)) {
    errors.push('Categoría inválida');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Uso en controller
const { isValid, errors } = validatePost(req.body);
if (!isValid) {
  return res.status(400).json({ success: false, errors });
}
```

### Helper para paginación
```javascript
// utils/pagination.js
export const paginate = (query, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  return query
    .skip(skip)
    .limit(limit);
};

export const getPaginationInfo = async (Model, query, page, limit) => {
  const total = await Model.countDocuments(query);
  
  return {
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1
  };
};
```

## 🗄️ Consultas MongoDB Útiles

### Buscar posts por texto
```javascript
// Buscar en título y contenido
const results = await Post.find(
  { $text: { $search: 'messi barcelona' } },
  { score: { $meta: 'textScore' } }
)
  .sort({ score: { $meta: 'textScore' } })
  .limit(10);
```

### Agregar posts más visitados
```javascript
const topPosts = await Post.aggregate([
  { $match: { published: true } },
  { $sort: { views: -1 } },
  { $limit: 10 },
  {
    $project: {
      title: 1,
      slug: 1,
      views: 1,
      excerpt: 1
    }
  }
]);
```

### Posts con autores más prolíficos
```javascript
const topAuthors = await Post.aggregate([
  { $match: { published: true } },
  {
    $group: {
      _id: '$author.name',
      postCount: { $sum: 1 },
      totalViews: { $sum: '$views' }
    }
  },
  { $sort: { postCount: -1 } },
  { $limit: 5 }
]);
```

## 🎯 Testing

### Test de endpoint con Jest
```javascript
// __tests__/fixtures.test.js
import request from 'supertest';
import app from '../server';

describe('Fixtures API', () => {
  test('GET /api/fixtures/live devuelve partidos', async () => {
    const response = await request(app)
      .get('/api/fixtures/live')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('GET /api/fixtures/stats devuelve estadísticas', async () => {
    const response = await request(app)
      .get('/api/fixtures/stats')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('requestsUsed');
    expect(response.body.data).toHaveProperty('requestsRemaining');
  });
});
```

### Test de componente React
```javascript
// __tests__/MatchCard.test.js
import { render, screen } from '@testing-library/react';
import MatchCard from '../components/MatchCard';

const mockMatch = {
  fixture: { id: 1, status: { short: '1H', elapsed: 45 } },
  teams: {
    home: { name: 'Real Madrid', logo: 'logo.png' },
    away: { name: 'Barcelona', logo: 'logo.png' }
  },
  goals: { home: 2, away: 1 },
  league: { name: 'La Liga' }
};

test('MatchCard muestra información del partido', () => {
  render(<MatchCard match={mockMatch} />);
  
  expect(screen.getByText('Real Madrid')).toBeInTheDocument();
  expect(screen.getByText('Barcelona')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

## 📊 Scripts NPM Personalizados

### package.json del backend
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "seed": "node scripts/seed.js",
    "clear-cache": "node scripts/clearCache.js",
    "stats": "node scripts/apiStats.js"
  }
}
```

### Script para limpiar cache
```javascript
// scripts/clearCache.js
import Redis from 'ioredis';
import { config } from '../config/config.js';

const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port
});

async function clearCache() {
  try {
    const keys = await redis.keys('*');
    
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`✅ ${keys.length} claves eliminadas del cache`);
    } else {
      console.log('ℹ️ No hay claves en el cache');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

clearCache();
```

### Script para seed de posts
```javascript
// scripts/seed.js
import mongoose from 'mongoose';
import Post from '../models/Post.js';
import { config } from '../config/config.js';

const samplePosts = [
  {
    title: 'Champions League: Análisis de la jornada',
    content: 'Contenido extenso del post...',
    excerpt: 'Resumen de la jornada de Champions',
    category: 'analisis',
    tags: ['champions-league', 'europa'],
    published: true
  },
  // ... más posts
];

async function seed() {
  try {
    await mongoose.connect(config.mongodb.uri);
    console.log('Conectado a MongoDB');

    await Post.deleteMany({});
    console.log('Posts existentes eliminados');

    await Post.insertMany(samplePosts);
    console.log(`${samplePosts.length} posts creados`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed();
```

## 🚀 Deployment

### Dockerfile para backend
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### docker-compose.yml completo
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongodb:27017/stack
      - REDIS_HOST=redis
    depends_on:
      - mongodb
      - redis

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000/api

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  mongo-data:
```

### Iniciar con Docker Compose
```bash
docker-compose up -d
docker-compose logs -f
```

## 🔐 Variables de Entorno para Producción

### .env de producción
```env
# API
API_SPORTS_KEY=tu_api_key_produccion
API_SPORTS_HOST=v3.football.api-sports.io

# Server
PORT=5000
NODE_ENV=production

# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/stack

# Redis (Redis Cloud)
REDIS_HOST=redis-12345.cloud.redislabs.com
REDIS_PORT=12345
REDIS_PASSWORD=tu_password_redis

# Cache TTL
CACHE_TTL_LIVE=300
CACHE_TTL_FIXTURES=3600
CACHE_TTL_STANDINGS=21600

# Rate Limiting
MAX_REQUESTS_PER_HOUR=4
SCRAPING_INTERVAL_MINUTES=5

# CORS
FRONTEND_URL=https://tu-dominio.com
```

---

**NOTA:** Estos ejemplos son completamente funcionales y pueden ser copiados
directamente a tu proyecto. Adapta según tus necesidades específicas.
