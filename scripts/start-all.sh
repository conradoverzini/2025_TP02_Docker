#!/bin/bash

echo "🌟 Iniciando TODOS los ambientes (Dev + QA)..."

# Crear directorios necesarios
mkdir -p uploads-dev
mkdir -p uploads-qa

# Construir e iniciar todos los servicios
docker-compose up -d

echo "✅ Todos los ambientes iniciados:"
echo ""
echo "🧪 QA:"
echo "   📊 Base de datos: localhost:3307"
echo "   🔧 Backend: localhost:8081"
echo "   🌐 Frontend: localhost:3001"
echo ""
echo "🏭 PRODUCCIÓN:"
echo "   📊 Base de datos: localhost:3308"
echo "   🔧 Backend: localhost:8082"
echo "   🌐 Frontend: localhost:3002"
echo ""
echo "📋 Comandos útiles:"
echo "   Ver logs: docker-compose logs -f"
echo "   Parar todos: docker-compose down"
echo "   Reconstruir: docker-compose up --build" 