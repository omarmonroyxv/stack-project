# Stack - Plataforma de Resultados de Fútbol en Vivo

Stack es una plataforma moderna para seguir resultados de fútbol en tiempo real, con integración de API-Sports.io y sistema de scraping de respaldo.

## 🚀 Características

- ⚽ **Partidos en Vivo**: Resultados actualizados en tiempo real
- 📊 **Fixtures y Clasificaciones**: Información completa de ligas
- 📝 **Blog/Noticias**: Sistema de contenido con SEO optimizado
- 🔄 **Sistema Híbrido**: API Sports + Scraping de respaldo
- 🎨 **UI Moderna**: Diseño responsive con Tailwind CSS
- ⚡ **Performance**: Cache con Redis para optimizar requests

## 🏗️ Arquitectura

### Backend (Node.js + Express)
- API RESTful
- Integración con API-Sports.io
- Sistema de scraping (FlashScore, LiveScore)
- Cache con Redis
- Base de datos MongoDB
- Rate limiting inteligente

### Frontend (Next.js + React)
- Server-Side Rendering
- Tailwind CSS para estilos
- SWR para data fetching
- Componentes reutilizables
- SEO optimizado

## 📋 Requisitos Previos

- Node.js 18+ 
- MongoDB 5+
- Redis 6+
- API Key de API-Sports.io

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repo>
cd stack-project
```

### 2. Configurar Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita `.env` y añade tu API Key:

```env
API_SPORTS_KEY=tu_api_key_aqui
MONGODB_URI=mongodb://localhost:27017/stack
REDIS_HOST=localhost
```

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
cp .env.local.example .env.local
```

## 🚀 Ejecución

### Desarrollo

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

El backend estará en `http://localhost:5000`
El frontend estará en `http://localhost:3000`

### Producción

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 📡 Estrategia de Datos

### Optimización de Requests API
Con 100 requests/día (~4 por hora):

1. **Requests Principales** (cada 15 min):
   - Partidos en vivo
   - Fixtures del día

2. **Scraping Intermedio** (cada 5 min):
   - Actualización de scores
   - Detección de goles
   - Llenar brechas de 14 minutos

3. **Cache Agresivo**:
   - Partidos en vivo: 5 minutos
   - Fixtures: 1 hora
   - Clasificaciones: 6 horas

## 📊 Endpoints API

### Fixtures
- `GET /api/fixtures/live` - Partidos en vivo
- `GET /api/fixtures/today` - Fixtures de hoy
- `GET /api/fixtures/:id` - Detalles de partido
- `GET /api/fixtures/leagues` - Ligas principales
- `GET /api/fixtures/standings` - Clasificaciones
- `GET /api/fixtures/stats` - Estadísticas de uso API

### Blog
- `GET /api/blog/posts` - Listar posts
- `GET /api/blog/posts/:slug` - Post individual
- `GET /api/blog/posts/featured` - Posts destacados
- `GET /api/blog/posts/category/:category` - Por categoría
- `POST /api/blog/admin/posts` - Crear post (admin)

## 🎯 SEO y Blog

El sistema de blog incluye:
- Meta tags optimizados
- URLs amigables (slugs)
- Categorías y tags
- Posts relacionados
- Sistema de comentarios
- Open Graph y Twitter Cards

## 🔒 Seguridad

- Helmet.js para headers de seguridad
- Rate limiting por IP
- CORS configurado
- Validación de datos de entrada
- Sanitización de contenido

## 📈 Mejoras Futuras

- [ ] Autenticación de usuarios
- [ ] Favoritos y notificaciones
- [ ] Panel de administración completo
- [ ] API GraphQL
- [ ] Progressive Web App (PWA)
- [ ] Análisis con IA
- [ ] Chat en vivo durante partidos

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autor

Tu Nombre

## 🙏 Agradecimientos

- API-Sports.io por los datos
- Comunidad de Next.js
- Tailwind CSS team
