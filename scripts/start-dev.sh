#!/bin/bash

echo "🚀 Iniciando ambiente de DESARROLLO..."

# Crear directorios necesarios
mkdir -p uploads-dev
mkdir -p uploads-qa

# Construir e iniciar solo los servicios de desarrollo
docker-compose up -d db-dev backend-dev frontend-dev

echo "✅ Ambiente de desarrollo iniciado:"
echo "   📊 Base de datos: localhost:7002"
echo "   🔧 Backend: localhost:5002"
echo "   🌐 Frontend: localhost:8080"
echo ""
echo "📋 Comandos útiles:"
echo "   Ver logs: docker-compose logs -f"
echo "   Parar servicios: docker-compose down"
echo "   Reconstruir: docker-compose up --build" 