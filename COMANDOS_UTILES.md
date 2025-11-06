# 🛠️ COMANDOS ÚTILES Y TROUBLESHOOTING - STACK

## 📦 Instalación y Setup

### Setup completo automatizado
```bash
chmod +x setup.sh
./setup.sh
```

### Setup manual
```bash
# Backend
cd backend
npm install
cp .env.example .env

# Frontend
cd ../frontend
npm install
cp .env.local.example .env.local
```

## 🚀 Iniciar Proyecto

### Modo Desarrollo (recomendado)
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Modo Producción
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm start
```

## 🐳 Docker Commands

### MongoDB
```bash
# Iniciar MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Detener MongoDB
docker stop mongodb

# Ver logs
docker logs mongodb

# Eliminar contenedor
docker rm mongodb
```

### Redis
```bash
# Iniciar Redis
docker run -d -p 6379:6379 --name redis redis:latest

# Detener Redis
docker stop redis

# Ver logs
docker logs redis

# Conectar a Redis CLI
docker exec -it redis redis-cli

# Eliminar contenedor
docker rm redis
```

### Iniciar ambos servicios
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
docker run -d -p 6379:6379 --name redis redis:latest
```

## 🔍 Verificaciones

### Verificar instalación de Node.js
```bash
node -v  # Debe ser v18 o superior
npm -v
```

### Verificar servicios corriendo
```bash
# MongoDB
mongosh --eval "db.version()"
# o con Docker
docker ps | grep mongodb

# Redis
redis-cli ping  # Debe responder PONG
# o con Docker
docker ps | grep redis
```

### Verificar puertos en uso
```bash
# Linux/Mac
lsof -i :3000  # Frontend
lsof -i :5000  # Backend
lsof -i :27017 # MongoDB
lsof -i :6379  # Redis

# Windows
netstat -ano | findstr :3000
```

### Health check del backend
```bash
curl http://localhost:5000/api/health
```

## 🐛 Troubleshooting

### Error: "Puerto ya en uso"

**Puerto 3000 (Frontend):**
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# O cambiar puerto
PORT=3001 npm run dev
```

**Puerto 5000 (Backend):**
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# O cambiar puerto en .env
PORT=5001
```

### Error: "Cannot connect to MongoDB"

```bash
# Verificar si MongoDB está corriendo
mongosh --eval "db.version()"

# Si no está corriendo, iniciarlo
# Con Docker:
docker start mongodb
# o crear nuevo contenedor:
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verificar conexión
mongosh "mongodb://localhost:27017"

# Ver logs de MongoDB
docker logs mongodb
```

### Error: "Redis connection failed"

```bash
# Verificar Redis
redis-cli ping

# Si no está corriendo
# Con Docker:
docker start redis
# o crear nuevo contenedor:
docker run -d -p 6379:6379 --name redis redis:latest

# Ver logs de Redis
docker logs redis

# El sistema funciona sin Redis, solo no habrá cache
```

### Error: "API Sports requests limit exceeded"

```bash
# El sistema automáticamente cambiará a modo scraping
# Verificar en la respuesta de la API:
curl http://localhost:5000/api/fixtures/stats

# Ver requests restantes:
# {
#   "requestsUsed": 4,
#   "requestsRemaining": 0,
#   "maxRequests": 4,
#   "resetInMinutes": 45
# }
```

### Error: "Module not found"

```bash
# Reinstalar dependencias
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json .next
npm install
```

### Error en build del frontend

```bash
cd frontend
rm -rf .next
npm run build
```

## 🧹 Limpieza

### Limpiar cache y reinstalar
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json .next
npm cache clean --force
npm install
```

### Limpiar Docker
```bash
# Detener todos los contenedores
docker stop mongodb redis

# Eliminar contenedores
docker rm mongodb redis

# Ver todos los contenedores
docker ps -a

# Limpiar todo Docker (CUIDADO)
docker system prune -a
```

## 📊 Monitoreo y Logs

### Ver logs en tiempo real

**Backend:**
```bash
cd backend
npm run dev
# Los logs aparecerán en la consola
```

**Frontend:**
```bash
cd frontend
npm run dev
# Los logs aparecerán en la consola
```

### Logs de MongoDB
```bash
docker logs -f mongodb
```

### Logs de Redis
```bash
docker logs -f redis
```

## 🧪 Testing

### Probar API endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Partidos en vivo
curl http://localhost:5000/api/fixtures/live

# Fixtures de hoy
curl http://localhost:5000/api/fixtures/today

# Stats de la API
curl http://localhost:5000/api/fixtures/stats

# Posts del blog
curl http://localhost:5000/api/blog/posts
```

### Crear post de prueba
```bash
curl -X POST http://localhost:5000/api/blog/admin/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Primer Post",
    "slug": "mi-primer-post",
    "content": "Contenido del post...",
    "excerpt": "Resumen breve",
    "category": "noticias",
    "published": true,
    "tags": ["test", "futbol"]
  }'
```

## 🔑 Variables de Entorno

### Backend (.env)
```env
# OBLIGATORIO
API_SPORTS_KEY=tu_api_key_aqui

# Opcional - Base de datos
MONGODB_URI=mongodb://localhost:27017/stack

# Opcional - Cache
REDIS_HOST=localhost
REDIS_PORT=6379

# Opcional - Servidor
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_NAME=Stack
```

## 💾 Base de Datos

### Conectar a MongoDB
```bash
mongosh "mongodb://localhost:27017/stack"
```

### Comandos útiles en MongoDB
```javascript
// Ver todas las colecciones
show collections

// Ver todos los posts
db.posts.find().pretty()

// Contar posts
db.posts.countDocuments()

// Eliminar todos los posts
db.posts.deleteMany({})

// Crear índices
db.posts.createIndex({ title: "text", content: "text" })
```

### Backup y Restore
```bash
# Backup
mongodump --db stack --out ./backup

# Restore
mongorestore --db stack ./backup/stack
```

## 🔄 Actualizar Dependencias

```bash
# Verificar actualizaciones
npm outdated

# Actualizar todas
npm update

# Actualizar package específico
npm install package-name@latest
```

## 🚀 Deployment

### Build de producción
```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
NODE_ENV=production npm start
```

### Variables para producción
Asegúrate de actualizar:
- `NEXT_PUBLIC_API_URL` con tu dominio
- `MONGODB_URI` con MongoDB Atlas o servicio cloud
- `REDIS_HOST` con Redis Cloud
- `FRONTEND_URL` en backend para CORS

## 📱 Acceder desde otros dispositivos

```bash
# Encontrar tu IP local
# Linux/Mac
ifconfig | grep inet
# Windows
ipconfig

# Cambiar .env.local del frontend:
NEXT_PUBLIC_API_URL=http://TU_IP:5000/api

# Actualizar CORS en backend .env:
FRONTEND_URL=http://TU_IP:3000

# Reiniciar ambos servidores
```

## 🆘 Ayuda Adicional

### Documentación oficial
- Next.js: https://nextjs.org/docs
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Redis: https://redis.io/docs
- API-Sports: https://www.api-football.com/documentation-v3

### Comandos de ayuda
```bash
# Backend
cd backend
npm run help  # Si implementas este script

# Frontend
cd frontend
npm run help  # Si implementas este script
```

### Reinicio completo del proyecto
```bash
# 1. Detener todo
pkill -f node
docker stop mongodb redis

# 2. Limpiar todo
cd backend && rm -rf node_modules
cd ../frontend && rm -rf node_modules .next

# 3. Reinstalar
./setup.sh

# 4. Reiniciar servicios
docker start mongodb redis

# 5. Iniciar proyecto
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] Node.js 18+ instalado
- [ ] Dependencias instaladas (npm install)
- [ ] Archivos .env configurados correctamente
- [ ] API_SPORTS_KEY válida en backend/.env
- [ ] MongoDB corriendo (opcional)
- [ ] Redis corriendo (opcional)
- [ ] Puertos 3000 y 5000 disponibles
- [ ] No hay errores en la consola
- [ ] Health check del backend funciona

---

**NOTA:** La mayoría de problemas se resuelven con un `npm install` limpio
y verificar que todos los servicios estén corriendo.
