#!/bin/bash

echo "🧹 Limpiando contenedores y volúmenes..."

# Parar y eliminar contenedores
docker-compose down

# Eliminar volúmenes (opcional - descomenta si quieres resetear las DBs)
# docker-compose down -v

# Eliminar imágenes no utilizadas
docker image prune -f

# Eliminar contenedores no utilizados
docker container prune -f

echo "✅ Limpieza completada!"
echo ""
echo "🔄 Para reiniciar:"
echo "   ./scripts/start-dev.sh    # Solo desarrollo"
echo "   ./scripts/start-qa.sh     # Solo QA"
echo "   ./scripts/start-all.sh    # Todos los ambientes" 