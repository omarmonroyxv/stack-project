# 🏗️ ARQUITECTURA DEL PROYECTO STACK

## 📊 Diagrama General del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO FINAL                            │
│                    (Navegador Web/Móvil)                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                     FRONTEND (Next.js)                           │
│                    Puerto: 3000                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Pages:                                                   │  │
│  │  - / (Home)                                              │  │
│  │  - /live (Partidos en Vivo)                              │  │
│  │  - /blog (Blog/Noticias)                                 │  │
│  │  - /match/[id] (Detalle Partido)                         │  │
│  │  - /blog/[slug] (Post Individual)                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Components:                                              │  │
│  │  - Layout (Navegación)                                    │  │
│  │  - MatchCard (Tarjeta de Partido)                        │  │
│  │  - BlogPostCard (Tarjeta de Post)                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Features:                                                        │
│  - SSR (Server-Side Rendering)                                   │
│  - Auto-refresh cada 30s                                         │
│  - SEO Optimizado                                                │
│  - Responsive Design                                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ REST API
                         │ (axios)
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                  BACKEND API (Express)                           │
│                    Puerto: 5000                                  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API Routes:                                              │  │
│  │                                                            │  │
│  │  /api/fixtures/*                                          │  │
│  │  ├─ GET /live         (Partidos en vivo)                 │  │
│  │  ├─ GET /today        (Fixtures de hoy)                  │  │
│  │  ├─ GET /:id          (Detalle partido)                  │  │
│  │  ├─ GET /leagues      (Ligas principales)                │  │
│  │  ├─ GET /standings    (Clasificaciones)                  │  │
│  │  └─ GET /stats        (Estadísticas API)                 │  │
│  │                                                            │  │
│  │  /api/blog/*                                              │  │
│  │  ├─ GET /posts        (Lista posts)                      │  │
│  │  ├─ GET /posts/:slug  (Post individual)                  │  │
│  │  ├─ GET /posts/featured (Posts destacados)              │  │
│  │  └─ POST /admin/posts (Crear post)                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Services:                                                │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │ apiSportsService.js                                 │ │  │
│  │  │ - Integración con API-Sports.io                    │ │  │
│  │  │ - Rate limiting (4 requests/hora)                  │ │  │
│  │  │ - Gestión de requests                              │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │ scrapingService.js                                  │ │  │
│  │  │ - Scraping de FlashScore                           │ │  │
│  │  │ - Scraping de LiveScore                            │ │  │
│  │  │ - Fallback automático                              │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │ cacheService.js                                     │ │  │
│  │  │ - Gestión de Redis                                 │ │  │
│  │  │ - TTL diferenciado                                 │ │  │
│  │  │ - Fallback sin Redis                               │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Middleware:                                                      │
│  - CORS, Helmet, Compression                                     │
│  - Rate Limiting (100 req/15min por IP)                          │
│  - Error Handling                                                │
│                                                                   │
│  Cron Jobs:                                                       │
│  - Scraping cada 5 minutos                                       │
└───────────┬─────────────────────┬───────────────────────────────┘
            │                     │
            │                     │
  ┌─────────▼─────────┐ ┌────────▼────────┐
  │   API-Sports.io   │ │  Web Scraping   │
  │   (External API)  │ │  (FlashScore/   │
  │                   │ │   LiveScore)    │
  │  - 100 req/día    │ │  - Backup       │
  │  - Datos oficiales│ │  - Cada 5 min   │
  └───────────────────┘ └─────────────────┘
            │
  ┌─────────▼─────────┐
  │   Cache (Redis)   │
  │   Puerto: 6379    │
  │                   │
  │  TTL:             │
  │  - Live: 5 min    │
  │  - Fixtures: 1h   │
  │  - Standings: 6h  │
  └───────────────────┘
            │
  ┌─────────▼─────────┐
  │  MongoDB          │
  │  Puerto: 27017    │
  │                   │
  │  Collections:     │
  │  - posts (Blog)   │
  │  - comments       │
  └───────────────────┘
```

## 🔄 Flujo de Datos - Partidos en Vivo

```
1. Usuario → Frontend (http://localhost:3000/live)
                │
2. Frontend → Backend API (GET /api/fixtures/live)
                │
3. Backend verifica Cache (Redis)
                │
        ┌───────┴───────┐
        │               │
   CACHE HIT       CACHE MISS
        │               │
        │        ┌──────┴──────┐
        │        │              │
        │   Verifica Rate  Rate Limit
        │   Limit OK       Alcanzado
        │        │              │
        │   API-Sports    Scraping
        │        │              │
        │        └──────┬───────┘
        │               │
        └───────┬───────┘
                │
4. Guardar en Cache (5 min TTL)
                │
5. Respuesta al Frontend
                │
6. Frontend muestra datos
                │
7. Auto-refresh cada 30s (volver a paso 2)
```

## 📁 Estructura de Archivos Detallada

```
stack-project/
│
├── backend/
│   ├── config/
│   │   └── config.js              # Configuración central
│   │
│   ├── controllers/
│   │   ├── fixturesController.js  # Lógica fixtures
│   │   └── blogController.js      # Lógica blog
│   │
│   ├── models/
│   │   └── Post.js                # Modelo MongoDB Post
│   │
│   ├── routes/
│   │   ├── fixtures.js            # Rutas de fixtures
│   │   └── blog.js                # Rutas de blog
│   │
│   ├── services/
│   │   ├── apiSportsService.js    # Servicio API-Sports
│   │   ├── scrapingService.js     # Servicio scraping
│   │   └── cacheService.js        # Servicio Redis
│   │
│   ├── .env                       # Variables de entorno
│   ├── .env.example               # Ejemplo de .env
│   ├── package.json               # Dependencias backend
│   └── server.js                  # Servidor principal
│
├── frontend/
│   ├── components/
│   │   ├── Layout.js              # Layout principal
│   │   ├── MatchCard.js           # Tarjeta de partido
│   │   └── BlogPostCard.js        # Tarjeta de post
│   │
│   ├── lib/
│   │   ├── api.js                 # Cliente API axios
│   │   └── utils.js               # Utilidades
│   │
│   ├── pages/
│   │   ├── _app.js                # App principal
│   │   ├── index.js               # Home
│   │   ├── live.js                # Partidos en vivo
│   │   └── blog/
│   │       └── index.js           # Lista de posts
│   │
│   ├── styles/
│   │   └── globals.css            # Estilos globales
│   │
│   ├── .env.local                 # Variables entorno frontend
│   ├── .env.local.example         # Ejemplo
│   ├── next.config.js             # Config Next.js
│   ├── tailwind.config.js         # Config Tailwind
│   ├── postcss.config.js          # Config PostCSS
│   └── package.json               # Dependencias frontend
│
├── .gitignore                     # Archivos ignorados Git
├── README.md                      # Documentación principal
├── QUICKSTART.md                  # Guía inicio rápido
├── COMANDOS_UTILES.md             # Comandos y troubleshooting
├── RESUMEN_PROYECTO_STACK.md      # Resumen para continuidad
└── setup.sh                       # Script de setup automático
```

## 🎯 Flujo de Datos - Sistema Híbrido

```
┌─────────────────────────────────────────────────────────┐
│           ESTRATEGIA DE ACTUALIZACIÓN                    │
└─────────────────────────────────────────────────────────┘

Minuto 0:00  → API Request #1 (Partidos en vivo)
              Cache: 5 minutos

Minuto 0:05  → Scraping (actualizar scores)
Minuto 0:10  → Scraping (actualizar scores)

Minuto 0:15  → API Request #2 (Partidos en vivo)
              Cache: 5 minutos

Minuto 0:20  → Scraping (actualizar scores)
Minuto 0:25  → Scraping (actualizar scores)

Minuto 0:30  → API Request #3 (Partidos en vivo)
              Cache: 5 minutos

...y así sucesivamente

Esto da:
- 4 API requests por hora (dentro del límite)
- Scraping cada 5 minutos (12 por hora)
- Datos actualizados constantemente
- Brecha máxima de 5 minutos
```

## 🔐 Sistema de Cache (Redis)

```
┌─────────────────────────────────────────────┐
│         ESTRATEGIA DE CACHE                 │
├─────────────────────────────────────────────┤
│                                             │
│  Key Pattern: [tipo]_[identificador]       │
│                                             │
│  live_matches                               │
│  ├─ TTL: 300 segundos (5 min)             │
│  └─ Contenido: Array de partidos en vivo  │
│                                             │
│  fixtures_today_2024-11-05                  │
│  ├─ TTL: 3600 segundos (1 hora)           │
│  └─ Contenido: Fixtures del día           │
│                                             │
│  fixture_12345                              │
│  ├─ TTL: 180 segundos (3 min)             │
│  └─ Contenido: Detalles de partido        │
│                                             │
│  standings_39_2024                          │
│  ├─ TTL: 21600 segundos (6 horas)         │
│  └─ Contenido: Clasificación liga         │
│                                             │
│  scraped_matches                            │
│  ├─ TTL: 180 segundos (3 min)             │
│  └─ Contenido: Datos de scraping          │
│                                             │
└─────────────────────────────────────────────┘
```

## 🗄️ Modelo de Datos - MongoDB

```
┌─────────────────────────────────────────┐
│         Collection: posts               │
├─────────────────────────────────────────┤
│                                         │
│  _id: ObjectId                          │
│  title: String (requerido)              │
│  slug: String (único, requerido)        │
│  content: String (requerido)            │
│  excerpt: String (max 300 chars)        │
│  coverImage: String (URL)               │
│  category: Enum [noticias, analisis...] │
│  tags: Array<String>                    │
│  author: {                              │
│    name: String                         │
│    avatar: String                       │
│  }                                      │
│  published: Boolean                     │
│  featured: Boolean                      │
│  views: Number (default: 0)             │
│  metaTitle: String (SEO)                │
│  metaDescription: String (SEO)          │
│  metaKeywords: Array<String>            │
│  relatedPosts: Array<ObjectId>          │
│  comments: Array<{                      │
│    author: String                       │
│    content: String                      │
│    createdAt: Date                      │
│  }>                                     │
│  createdAt: Date (auto)                 │
│  updatedAt: Date (auto)                 │
│                                         │
└─────────────────────────────────────────┘

Índices:
- slug (único)
- published + createdAt (descendente)
- category
- tags
- full-text en title y content
```

## 🔄 Ciclo de Vida de Request

```
1. Request del Usuario
   └─> Frontend hace petición

2. Backend recibe request
   └─> Express middleware
       ├─> CORS check
       ├─> Rate limiting
       └─> Helmet (seguridad)

3. Router direcciona a controller
   └─> fixturesController o blogController

4. Controller ejecuta lógica
   └─> Llama al servicio apropiado
       ├─> apiSportsService (para datos externos)
       ├─> scrapingService (backup)
       └─> cacheService (cache)

5. Service verifica cache
   ├─> Cache HIT: Retorna datos
   └─> Cache MISS:
       ├─> Hace request externo
       ├─> Guarda en cache
       └─> Retorna datos

6. Controller formatea respuesta
   └─> JSON estandarizado:
       {
         success: boolean,
         data: any,
         message?: string,
         error?: string
       }

7. Frontend recibe respuesta
   └─> React actualiza UI
       └─> Usuario ve datos actualizados
```

## 🚀 Performance Optimizations

```
┌─────────────────────────────────────────┐
│      OPTIMIZACIONES IMPLEMENTADAS       │
├─────────────────────────────────────────┤
│                                         │
│  Backend:                               │
│  ✓ Cache con Redis (reduce API calls)  │
│  ✓ Rate limiting inteligente            │
│  ✓ Compression middleware               │
│  ✓ Helmet para seguridad                │
│  ✓ Cron jobs para pre-fetch             │
│                                         │
│  Frontend:                              │
│  ✓ SSR con Next.js                      │
│  ✓ Auto-refresh inteligente             │
│  ✓ Lazy loading de componentes          │
│  ✓ Tailwind CSS (purge CSS no usado)    │
│  ✓ Image optimization                   │
│                                         │
│  Base de Datos:                         │
│  ✓ Índices en MongoDB                   │
│  ✓ Proyecciones (select específicos)    │
│  ✓ Paginación eficiente                 │
│                                         │
└─────────────────────────────────────────┘
```

## 📊 Métricas y Monitoreo

```
Puntos de monitoreo recomendados:

1. API Requests
   - Total requests por hora
   - Requests por endpoint
   - Rate limit status

2. Cache Performance
   - Hit rate
   - Miss rate
   - Tamaño de cache

3. Response Times
   - Tiempo promedio de respuesta
   - P95, P99
   - Endpoints más lentos

4. Errors
   - Errores 5xx
   - Errores 4xx
   - Fallos de scraping

5. Business Metrics
   - Usuarios activos
   - Posts más visitados
   - Partidos más seguidos
```

---

Esta arquitectura está diseñada para:
- ✅ Escalar horizontalmente
- ✅ Manejar fallos gracefully
- ✅ Optimizar uso de recursos
- ✅ Facilitar mantenimiento
- ✅ Permitir extensiones futuras
