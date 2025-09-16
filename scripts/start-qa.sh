#!/bin/bash

echo "🧪 Iniciando ambiente de QA..."

# Crear directorios necesarios
mkdir -p uploads-dev
mkdir -p uploads-qa

# Construir e iniciar solo los servicios de QA
docker-compose up -d db-qa backend-qa frontend-qa

echo "✅ Ambiente de QA iniciado:"
echo "   📊 Base de datos: localhost:3307"
echo "   🔧 Backend: localhost:8081"
echo "   🌐 Frontend: localhost:3001"
echo ""
echo "📋 Comandos útiles:"
echo "   Ver logs: docker-compose logs -f"
echo "   Parar servicios: docker-compose down"
echo "   Reconstruir: docker-compose up --build" 