# 🐳 Trabajo Práctico N°2 - Introducción a Docker

Este proyecto implementa una aplicación de gestión de cursos con arquitectura de microservicios usando Docker, con entornos separados para QA y Producción.

## 📋 Tabla de Contenidos

- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Prerrequisitos](#prerrequisitos)
- [Construcción de Imágenes](#construcción-de-imágenes)
- [Ejecución con Docker Compose](#ejecución-con-docker-compose)
- [Acceso a la Aplicación](#acceso-a-la-aplicación)
- [Conexión a Bases de Datos](#conexión-a-bases-de-datos)
- [Verificación del Sistema](#verificación-del-sistema)
- [Comandos Útiles](#comandos-útiles)
- [Troubleshooting](#troubleshooting)

## 🏗️ Arquitectura del Sistema

El sistema está compuesto por:

- **Frontend**: Aplicación Next.js/React
- **Backend**: API REST en Go
- **Base de Datos**: MySQL 8
- **Entornos**: QA y Producción completamente aislados

### Servicios por Entorno

| Servicio      | QA          | PROD        |
| ------------- | ----------- | ----------- |
| Frontend      | Puerto 3001 | Puerto 3002 |
| Backend       | Puerto 8081 | Puerto 8082 |
| Base de Datos | Puerto 3307 | Puerto 3308 |

## 🔧 Prerrequisitos

- Docker Desktop instalado y ejecutándose
- Docker Compose v2.0+
- Git (para clonar el repositorio)

## 🏭 Construcción de Imágenes

### Opción 1: Usar Imágenes Pre-construidas (Recomendado)

Las imágenes ya están disponibles en Docker Hub:

```bash
# Backend
docker pull felipeeguia03/courses-backend:1.1

# Frontend QA
docker pull felipeeguia03/courses-frontend:1.0-qa

# Frontend PROD
docker pull felipeeguia03/courses-frontend:1.0-prod
```

### Opción 2: Construir Imágenes Localmente

Si necesitas modificar el código y reconstruir las imágenes:

```bash
# Construir Backend
docker build -t felipeeguia03/courses-backend:1.1 ./final/backend

# Construir Frontend QA
docker build -t felipeeguia03/courses-frontend:1.0-qa \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8081 \
  ./final/frontend/front

# Construir Frontend PROD
docker build -t felipeeguia03/courses-frontend:1.0-prod \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8082 \
  ./final/frontend/front
```

### Subir Imágenes a Docker Hub

```bash
# Subir Backend
docker push felipeeguia03/courses-backend:1.1

# Subir Frontends
docker push felipeeguia03/courses-frontend:1.0-qa
docker push felipeeguia03/courses-frontend:1.0-prod
```

## 🚀 Ejecución con Docker Compose

### Levantar Todo el Sistema

```bash
# Clonar el repositorio
git clone https://github.com/felipeeguia03/2025_TP02_Docker.git
cd 2025_TP02_Docker

# Levantar todos los servicios
docker-compose up -d
```

### Levantar Entornos Específicos

```bash
# Solo entorno QA
docker-compose up -d db-qa backend-qa frontend-qa

# Solo entorno PROD
docker-compose up -d db-prod backend-prod frontend-prod
```

### Detener el Sistema

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (¡CUIDADO! Borra los datos)
docker-compose down -v
```

## 🌐 Acceso a la Aplicación

### URLs de Acceso

| Entorno  | Frontend              | Backend API           | Base de Datos  |
| -------- | --------------------- | --------------------- | -------------- |
| **QA**   | http://localhost:3001 | http://localhost:8081 | localhost:3307 |
| **PROD** | http://localhost:3002 | http://localhost:8082 | localhost:3308 |

### Endpoints de la API

#### Health Check

```bash
# QA
curl http://localhost:8081/health

# PROD
curl http://localhost:8082/health
```

#### Cursos

```bash
# Obtener todos los cursos
curl http://localhost:8081/courses | jq .
curl http://localhost:8082/courses | jq .

# Buscar cursos
curl "http://localhost:8081/courses/search?query=docker" | jq .

# Crear curso
curl -X POST http://localhost:8081/courses/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Curso",
    "description": "Descripción del curso",
    "category": "Programación",
    "instructor": "Instructor",
    "duration": 60,
    "requirement": "Ninguno"
  }'
```

## 🗄️ Conexión a Bases de Datos

### Conectar via MySQL Client

```bash
# Base de datos QA
docker exec -it db-qa mysql -u qauser -pqapass courses_qa

# Base de datos PROD
docker exec -it db-prod mysql -u produser -pprodpass courses_prod
```

### Credenciales de Base de Datos

| Entorno | Usuario  | Contraseña | Base de Datos |
| ------- | -------- | ---------- | ------------- |
| QA      | qauser   | qapass     | courses_qa    |
| PROD    | produser | prodpass   | courses_prod  |

### Comandos MySQL Útiles

```sql
-- Ver todas las tablas
SHOW TABLES;

-- Ver cursos
SELECT * FROM courses;

-- Ver usuarios
SELECT * FROM users;

-- Ver suscripciones
SELECT * FROM subscriptions;

-- Salir
exit;
```

## ✅ Verificación del Sistema

### 1. Verificar Estado de Contenedores

```bash
# Ver todos los contenedores
docker-compose ps

# Verificar que todos estén "Up"
```

### 2. Probar Health Checks

```bash
# Backend QA
curl http://localhost:8081/health
# Respuesta esperada: {"message":"Backend is running","status":"ok"}

# Backend PROD
curl http://localhost:8082/health
# Respuesta esperada: {"message":"Backend is running","status":"ok"}
```

### 3. Probar Frontends

```bash
# Verificar que respondan
curl -I http://localhost:3001
curl -I http://localhost:3002
# Respuesta esperada: HTTP/1.1 200 OK
```

### 4. Verificar Aislamiento entre Entornos

```bash
# Crear curso en QA
curl -X POST http://localhost:8081/courses/create \
  -H "Content-Type: application/json" \
  -d '{"title":"QA Test","description":"Test","category":"Test","instructor":"Test","duration":1,"requirement":"Test"}'

# Verificar que NO aparece en PROD
curl http://localhost:8082/courses | jq .

# Crear curso en PROD
curl -X POST http://localhost:8082/courses/create \
  -H "Content-Type: application/json" \
  -d '{"title":"PROD Test","description":"Test","category":"Test","instructor":"Test","duration":1,"requirement":"Test"}'

# Verificar que NO aparece en QA
curl http://localhost:8081/courses | jq .
```

## 🛠️ Comandos Útiles

### Gestión de Contenedores

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend-qa
docker-compose logs -f frontend-prod

# Reiniciar un servicio
docker-compose restart backend-qa

# Ver uso de recursos
docker stats
```

### Gestión de Imágenes

```bash
# Ver imágenes locales
docker images | grep felipeeguia03

# Eliminar imágenes no utilizadas
docker image prune

# Ver detalles de un contenedor
docker inspect backend-qa | grep Image
```

### Gestión de Volúmenes

```bash
# Ver volúmenes
docker volume ls

# Inspeccionar un volumen
docker volume inspect 2025_tp02_docker_db-qa-data

# Eliminar volúmenes (¡CUIDADO! Borra los datos)
docker volume prune
```

### Gestión de Redes

```bash
# Ver redes
docker network ls

# Inspeccionar una red
docker network inspect 2025_tp02_docker_qa-net
docker network inspect 2025_tp02_docker_prod-net
```

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Puerto ya en uso

```bash
# Ver qué proceso usa el puerto
lsof -i :3001
lsof -i :8081

# Detener contenedores y liberar puertos
docker-compose down
```

#### 2. Base de datos no responde

```bash
# Ver logs de la base de datos
docker-compose logs db-qa
docker-compose logs db-prod

# Reiniciar solo la base de datos
docker-compose restart db-qa
```

#### 3. Frontend no se conecta al backend

```bash
# Verificar que el backend esté corriendo
curl http://localhost:8081/health
curl http://localhost:8082/health

# Ver logs del frontend
docker-compose logs frontend-qa
docker-compose logs frontend-prod
```

#### 4. Imágenes no se descargan

```bash
# Forzar descarga de imágenes
docker-compose pull

# Verificar conectividad a Docker Hub
docker pull hello-world
```

### Limpieza Completa

```bash
# Detener y eliminar todo
docker-compose down -v

# Eliminar imágenes
docker rmi felipeeguia03/courses-backend:1.1
docker rmi felipeeguia03/courses-frontend:1.0-qa
docker rmi felipeeguia03/courses-frontend:1.0-prod

# Limpiar sistema Docker
docker system prune -a

# Levantar de nuevo
docker-compose up -d
```

## 📚 Información Adicional

### Estructura del Proyecto

```
2025_TP02_Docker/
├── docker-compose.yml          # Configuración de servicios
├── final/
│   ├── backend/               # Código del backend Go
│   └── frontend/front/        # Código del frontend Next.js
├── scripts/                   # Scripts de inicialización
└── README.md                  # Este archivo
```

### Tecnologías Utilizadas

- **Backend**: Go 1.22, Gin, GORM, MySQL
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Base de Datos**: MySQL 8
- **Containerización**: Docker, Docker Compose
- **Registro**: Docker Hub

### Características del Sistema

- ✅ Aislamiento completo entre entornos QA y PROD
- ✅ Persistencia de datos con volúmenes Docker
- ✅ Redes separadas para cada entorno
- ✅ Health checks automáticos
- ✅ Imágenes optimizadas con multi-stage builds
- ✅ Usuarios no-root en contenedores
- ✅ Variables de entorno configurables

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Construye y prueba las imágenes
5. Envía un Pull Request

## 📄 Licencia

Este proyecto es parte de un trabajo práctico académico.

---

**Desarrollado por**: Felipe Eguía  
**Repositorio**: https://github.com/felipeeguia03/2025_TP02_Docker  
**Docker Hub**: https://hub.docker.com/u/felipeeguia03
