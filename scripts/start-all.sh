#!/bin/bash

echo "🌟 Iniciando TODOS los ambientes (Dev + QA)..."

# Crear directorios necesarios
mkdir -p uploads-dev
mkdir -p uploads-qa

# Construir e iniciar todos los servicios
docker-compose up -d

echo "✅ Todos los ambientes iniciados:"
echo ""
echo "🔧 DESARROLLO:"
echo "   📊 Base de datos: localhost:7002"
echo "   🔧 Backend: localhost:5002"
echo "   🌐 Frontend: localhost:8080"
echo ""
echo "🧪 QA:"
echo "   📊 Base de datos: localhost:7003"
echo "   🔧 Backend: localhost:5003"
echo "   🌐 Frontend: localhost:8081"
echo ""
echo "📋 Comandos útiles:"
echo "   Ver logs: docker-compose logs -f"
echo "   Parar todos: docker-compose down"
echo "   Reconstruir: docker-compose up --build" 