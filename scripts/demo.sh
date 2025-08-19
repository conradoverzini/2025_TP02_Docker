#!/bin/bash

echo "🎬 DEMOSTRACIÓN COMPLETA DEL PROYECTO DOCKER"
echo "============================================"
echo ""

echo "📋 CONCEPTOS QUE VAMOS A DEMOSTRAR:"
echo "1. 🐳 Containerización con Docker"
echo "2. 🔄 Orquestación con Docker Compose"
echo "3. 🧪 Ambientes separados (Dev vs QA)"
echo "4. 🌐 Networking entre contenedores"
echo "5. 💾 Persistencia de datos con volúmenes"
echo "6. 🔧 Variables de entorno"
echo ""

echo "🏗️ ARQUITECTURA DEL PROYECTO:"
echo "┌─────────────────────────────────────────────────────────────┐"
echo "│                    AMBIENTE DE DESARROLLO                   │"
echo "├─────────────────────────────────────────────────────────────┤"
echo "│  Frontend (8080) ←→ Backend (5002) ←→ Base de Datos (7002) │"
echo "└─────────────────────────────────────────────────────────────┘"
echo ""
echo "┌─────────────────────────────────────────────────────────────┐"
echo "│                      AMBIENTE DE QA                        │"
echo "├─────────────────────────────────────────────────────────────┤"
echo "│  Frontend (8081) ←→ Backend (5003) ←→ Base de Datos (7003) │"
echo "└─────────────────────────────────────────────────────────────┘"
echo ""

echo "🚀 PASO 1: Iniciando solo la base de datos de desarrollo..."
docker-compose up -d db-dev
sleep 5

echo "✅ Base de datos iniciada en puerto 7002"
echo "📊 Verificando datos de prueba..."

# Verificar datos de prueba
USERS=$(docker exec -it db-dev mysql -u devuser -pdevpass -e "USE courses_dev; SELECT COUNT(*) as total FROM users;" 2>/dev/null | tail -1)
COURSES=$(docker exec -it db-dev mysql -u devuser -pdevpass -e "USE courses_dev; SELECT COUNT(*) as total FROM courses;" 2>/dev/null | tail -1)

echo "   👥 Usuarios en DB: $USERS"
echo "   📚 Cursos en DB: $COURSES"
echo ""

echo "🔧 PASO 2: Iniciando el backend..."
docker-compose up -d backend-dev
sleep 10

echo "✅ Backend iniciado en puerto 5002"
echo "🔍 Verificando endpoint de health..."

# Verificar health endpoint
if curl -s http://localhost:5002/health > /dev/null; then
    echo "   ✅ API funcionando correctamente"
    echo "   📡 Health check: http://localhost:5002/health"
else
    echo "   ❌ API no responde"
fi
echo ""

echo "🌐 PASO 3: Iniciando el frontend..."
docker-compose up -d frontend-dev
sleep 15

echo "✅ Frontend iniciado en puerto 8080"
echo "🔍 Verificando frontend..."

# Verificar frontend
if curl -s http://localhost:8080 > /dev/null; then
    echo "   ✅ Frontend funcionando correctamente"
    echo "   🌐 URL: http://localhost:8080"
else
    echo "   ❌ Frontend no responde"
fi
echo ""

echo "🧪 PASO 4: Iniciando ambiente de QA..."
docker-compose up -d db-qa backend-qa frontend-qa
sleep 10

echo "✅ Ambiente de QA iniciado:"
echo "   📊 DB QA: localhost:7003"
echo "   🔧 Backend QA: localhost:5003"
echo "   🌐 Frontend QA: localhost:8081"
echo ""

echo "📊 RESUMEN FINAL:"
echo "================="
echo "🔧 DESARROLLO:"
echo "   📊 Base de datos: localhost:7002 (MySQL)"
echo "   🔧 Backend API: localhost:5002 (Go)"
echo "   🌐 Frontend: localhost:8080 (Next.js)"
echo ""
echo "🧪 QA:"
echo "   📊 Base de datos: localhost:7003 (MySQL)"
echo "   🔧 Backend API: localhost:5003 (Go)"
echo "   🌐 Frontend: localhost:8081 (Next.js)"
echo ""

echo "🔍 COMANDOS DE VERIFICACIÓN:"
echo "============================"
echo "📋 Ver contenedores corriendo:"
echo "   docker ps"
echo ""
echo "📋 Ver logs en tiempo real:"
echo "   docker-compose logs -f"
echo ""
echo "📋 Conectar a base de datos:"
echo "   mysql -h localhost -P 7002 -u devuser -p courses_dev"
echo ""
echo "📋 Probar API:"
echo "   curl http://localhost:5002/health"
echo ""
echo "📋 Acceder a frontend:"
echo "   open http://localhost:8080"
echo ""

echo "🎯 CONCEPTOS DEMOSTRADOS:"
echo "========================"
echo "✅ Containerización: Cada servicio corre en su propio contenedor"
echo "✅ Orquestación: Docker Compose maneja todos los servicios"
echo "✅ Networking: Los contenedores se comunican entre sí"
echo "✅ Volúmenes: Los datos persisten entre reinicios"
echo "✅ Variables de entorno: Configuración por ambiente"
echo "✅ Aislamiento: Dev y QA son completamente independientes"
echo ""

echo "🚀 ¡DEMOSTRACIÓN COMPLETADA!"
echo "Ahora puedes explorar cada componente en tu navegador." 