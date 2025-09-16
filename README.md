# 🚀 Sistema de Cursos - Docker

## 🏗️ Construir las Imágenes

```bash
# Construir todas las imágenes
docker-compose build

# Construir imagen específica
docker build -t felipeeguia03/courses-backend:1.1 ./final/backend
docker build -t felipeeguia03/courses-frontend:1.1 ./final/frontend/front
```

## 🚀 Ejecutar los Contenedores

```bash
# Iniciar todos los servicios (QA + Producción)
docker-compose up -d

# Iniciar solo QA
docker-compose up -d db-qa backend-qa frontend-qa

# Iniciar solo Producción
docker-compose up -d db-prod backend-prod frontend-prod

# Con scripts automatizados
./scripts/start-all.sh
./scripts/start-qa.sh
```

## 🌐 Acceder a la Aplicación

### QA

- Frontend: http://localhost:3001
- Backend: http://localhost:8081
- Base de datos: localhost:3307

### Producción

- Frontend: http://localhost:3002
- Backend: http://localhost:8082
- Base de datos: localhost:3308

## 🗄️ Conectarse a la Base de Datos

```bash
# QA
mysql -h localhost -P 3307 -u qauser -pqapass courses_qa

# Producción
mysql -h localhost -P 3308 -u produser -pprodpass courses_prod

# Root access
mysql -h localhost -P 3307 -u root -prootpass
mysql -h localhost -P 3308 -u root -prootpass
```

## ✅ Verificar que Todo Funciona

```bash
# Ver contenedores activos
docker-compose ps

# Ver logs
docker-compose logs -f

# Health checks
curl http://localhost:8081/health
curl http://localhost:8082/health

# Verificar BD
docker exec -it db-qa mysql -u qauser -pqapass -e "SHOW DATABASES;"
docker exec -it db-prod mysql -u produser -pprodpass -e "SHOW DATABASES;"
```

## 🛠️ Comandos Útiles

```bash
# Parar servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v

# Reconstruir
docker-compose up --build -d

# Ver logs específicos
docker-compose logs -f backend-qa
docker-compose logs -f frontend-qa

# Limpiar todo
./scripts/cleanup.sh
```

## 📦 Imágenes Docker Hub

- `felipeeguia03/courses-backend:1.1`
- `felipeeguia03/courses-frontend:1.1`

```bash
# Pull imágenes desde Docker Hub
docker pull felipeeguia03/courses-backend:1.1
docker pull felipeeguia03/courses-frontend:1.1
```
