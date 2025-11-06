# 🚀 Guía de Inicio Rápido - Stack

## Prerequisitos Rápidos

Asegúrate de tener instalado:
- Node.js 18+
- MongoDB (o MongoDB Atlas)
- Redis (o usar modo sin cache)

## Instalación Express (5 minutos)

### 1. Backend Setup

```bash
cd backend
npm install
```

Crea `.env`:
```bash
cp .env.example .env
```

Edita `.env` con tu API Key:
```env
API_SPORTS_KEY=tu_clave_de_api_sports_io
MONGODB_URI=mongodb://localhost:27017/stack
REDIS_HOST=localhost
PORT=5000
```

### 2. Frontend Setup

```bash
cd ../frontend
npm install
```

Crea `.env.local`:
```bash
cp .env.local.example .env.local
```

### 3. Iniciar Servicios

**Opción A - Con Docker (Recomendado):**

```bash
# MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Redis
docker run -d -p 6379:6379 --name redis redis:latest
```

**Opción B - Instalación Local:**
- Instala MongoDB y Redis en tu sistema
- Inícielos como servicios

### 4. Iniciar la Aplicación

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Verás:
```
✅ MongoDB conectado
✅ Redis conectado
✅ Servicios inicializados
🚀 Stack API corriendo en puerto 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Verás:
```
ready - started server on 0.0.0.0:3000
```

### 5. ¡Listo!

Abre tu navegador en:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 Primeros Pasos

### Verificar que todo funciona

1. **Health Check del Backend:**
```bash
curl http://localhost:5000/api/health
```

2. **Ver partidos en vivo:**
```bash
curl http://localhost:5000/api/fixtures/live
```

3. **Abrir el frontend:**
   - Visita http://localhost:3000
   - Deberías ver la página de inicio
   - Click en "En Vivo" para ver partidos

### Crear tu primer post de blog

```bash
curl -X POST http://localhost:5000/api/blog/admin/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bienvenido a Stack",
    "content": "Este es mi primer post en Stack...",
    "excerpt": "Introducción a nuestra plataforma",
    "category": "noticias",
    "published": true
  }'
```

## ⚙️ Configuración Opcional

### Sin Redis (modo sin cache)
Si no quieres instalar Redis, el sistema funcionará sin cache:
- Simplemente no inicies Redis
- El backend seguirá funcionando
- Los datos vendrán directamente de la API

### Sin MongoDB (solo fixtures)
Si solo quieres ver partidos sin blog:
- No inicies MongoDB
- Comenta las líneas de MongoDB en `server.js`
- El sistema de fixtures funcionará normal

## 🐛 Solución de Problemas

### Error: "Cannot connect to MongoDB"
```bash
# Verifica que MongoDB esté corriendo
docker ps | grep mongodb
# o
mongod --version
```

### Error: "Redis connection failed"
```bash
# Verifica que Redis esté corriendo
docker ps | grep redis
# o
redis-cli ping
# Debería responder: PONG
```

### Error: "API Sports requests limit"
- Revisa tu API Key en `.env`
- Verifica tus requests en: https://dashboard.api-football.com/
- El sistema usará scraping automáticamente como respaldo

### Puerto 3000 ya en uso
```bash
# Matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9

# o cambiar puerto en frontend
PORT=3001 npm run dev
```

## 📚 Siguientes Pasos

1. **Personaliza los estilos**: Edita `frontend/tailwind.config.js`
2. **Añade más ligas**: Modifica `backend/services/apiSportsService.js`
3. **Mejora el scraping**: Adapta selectores en `backend/services/scrapingService.js`
4. **Crea contenido**: Usa el endpoint de blog para añadir posts

## 🆘 ¿Necesitas Ayuda?

- Revisa la documentación completa en `README.md`
- Verifica los logs del backend y frontend
- Consulta la API de API-Sports: https://www.api-football.com/documentation-v3

¡Disfruta construyendo con Stack! ⚽🚀
