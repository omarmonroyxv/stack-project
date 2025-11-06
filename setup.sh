#!/bin/bash

# Script de Setup Automático - Stack Project
# Este script configura todo el proyecto de forma automática

echo "🚀 Iniciando setup de Stack Project..."
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar Node.js
echo "📦 Verificando dependencias..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    echo "Por favor instala Node.js 18+ desde https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js versión 18+ requerida (tienes v$NODE_VERSION)${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm $(npm -v)${NC}"
echo ""

# Setup Backend
echo "🔧 Configurando Backend..."
cd backend

if [ -f "package.json" ]; then
    echo "Instalando dependencias del backend..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Dependencias del backend instaladas${NC}"
    else
        echo -e "${RED}❌ Error instalando dependencias del backend${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ package.json no encontrado en backend/${NC}"
    exit 1
fi

# Crear .env si no existe
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${YELLOW}⚠ Archivo .env creado. ${NC}"
        echo -e "${YELLOW}⚠ IMPORTANTE: Edita backend/.env y añade tu API_SPORTS_KEY${NC}"
    else
        echo -e "${RED}❌ .env.example no encontrado${NC}"
    fi
else
    echo -e "${GREEN}✓ Archivo .env ya existe${NC}"
fi

cd ..
echo ""

# Setup Frontend
echo "🎨 Configurando Frontend..."
cd frontend

if [ -f "package.json" ]; then
    echo "Instalando dependencias del frontend..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Dependencias del frontend instaladas${NC}"
    else
        echo -e "${RED}❌ Error instalando dependencias del frontend${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ package.json no encontrado en frontend/${NC}"
    exit 1
fi

# Crear .env.local si no existe
if [ ! -f ".env.local" ]; then
    if [ -f ".env.local.example" ]; then
        cp .env.local.example .env.local
        echo -e "${GREEN}✓ Archivo .env.local creado${NC}"
    else
        echo -e "${RED}❌ .env.local.example no encontrado${NC}"
    fi
else
    echo -e "${GREEN}✓ Archivo .env.local ya existe${NC}"
fi

cd ..
echo ""

# Verificar servicios opcionales
echo "🔍 Verificando servicios opcionales..."

# Verificar MongoDB
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✓ MongoDB encontrado${NC}"
elif command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠ MongoDB no encontrado. Puedes iniciarlo con Docker:${NC}"
    echo "  docker run -d -p 27017:27017 --name mongodb mongo:latest"
else
    echo -e "${YELLOW}⚠ MongoDB no encontrado (opcional para blog)${NC}"
fi

# Verificar Redis
if command -v redis-cli &> /dev/null; then
    echo -e "${GREEN}✓ Redis encontrado${NC}"
elif command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠ Redis no encontrado. Puedes iniciarlo con Docker:${NC}"
    echo "  docker run -d -p 6379:6379 --name redis redis:latest"
else
    echo -e "${YELLOW}⚠ Redis no encontrado (opcional para cache)${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Setup completado!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Próximos pasos:"
echo ""
echo "1. Edita backend/.env y añade tu API_SPORTS_KEY"
echo "   Obtén tu clave en: https://www.api-football.com"
echo ""
echo "2. Inicia MongoDB y Redis (opcional):"
echo "   docker run -d -p 27017:27017 --name mongodb mongo:latest"
echo "   docker run -d -p 6379:6379 --name redis redis:latest"
echo ""
echo "3. Inicia el proyecto:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"
echo ""
echo "4. Abre tu navegador en:"
echo "   http://localhost:3000"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}⚠ IMPORTANTE:${NC} Sin API_SPORTS_KEY el proyecto usará scraping"
echo ""
