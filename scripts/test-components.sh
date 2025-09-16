#!/bin/bash

echo "🧪 SCRIPT DE PRUEBAS DE COMPONENTES"
echo "=================================="

# Función para probar base de datos
test_database() {
    echo ""
    echo "📊 Probando Base de Datos..."
    docker-compose up -d db-dev
    sleep 5
    
    echo "✅ Verificando conexión a la base de datos..."
    if docker exec -it db-dev mysql -u devuser -pdevpass -e "USE courses_dev; SELECT COUNT(*) as total_users FROM users;" > /dev/null 2>&1; then
        echo "✅ Base de datos funcionando correctamente"
        echo "   📊 Puerto: localhost:7002"
        echo "   👥 Usuarios de prueba: 2"
        echo "   📚 Cursos de prueba: 2"
    else
        echo "❌ Error en la base de datos"
    fi
}

# Función para probar backend
test_backend() {
    echo ""
    echo "🔧 Probando Backend..."
    docker-compose up -d db-dev backend-dev
    sleep 10
    
    echo "✅ Verificando API del backend..."
    if curl -s http://localhost:5002/health > /dev/null 2>&1; then
        echo "✅ Backend funcionando correctamente"
        echo "   🔧 Puerto: localhost:5002"
        echo "   📊 Conectado a DB: localhost:7002"
    else
        echo "❌ Error en el backend"
        echo "   📋 Logs del backend:"
        docker-compose logs backend-dev --tail=10
    fi
}

# Función para probar frontend
test_frontend() {
    echo ""
    echo "🌐 Probando Frontend..."
    docker-compose up -d db-dev backend-dev frontend-dev
    sleep 15
    
    echo "✅ Verificando frontend..."
    if curl -s http://localhost:8080 > /dev/null 2>&1; then
        echo "✅ Frontend funcionando correctamente"
        echo "   🌐 Puerto: localhost:8080"
        echo "   🔧 Conectado a API: localhost:5002"
    else
        echo "❌ Error en el frontend"
        echo "   📋 Logs del frontend:"
        docker-compose logs frontend-dev --tail=10
    fi
}

# Función para mostrar resumen
show_summary() {
    echo ""
    echo "📋 RESUMEN DE PRUEBAS"
    echo "===================="
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
    echo "   Parar todo: docker-compose down"
    echo "   Ver contenedores: docker ps"
}

# Ejecutar pruebas
case "$1" in
    "db")
        test_database
        ;;
    "backend")
        test_backend
        ;;
    "frontend")
        test_frontend
        ;;
    "all")
        test_database
        test_backend
        test_frontend
        ;;
    *)
        echo "Uso: $0 [db|backend|frontend|all]"
        echo ""
        echo "Ejemplos:"
        echo "  $0 db        # Probar solo base de datos"
        echo "  $0 backend   # Probar backend (incluye DB)"
        echo "  $0 frontend  # Probar frontend (incluye DB y backend)"
        echo "  $0 all       # Probar todo"
        exit 1
        ;;
esac

show_summary 