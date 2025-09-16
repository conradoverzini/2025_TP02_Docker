#TP2- DOCKER Sistema de Cursos - Docker

Sistema de gestión de cursos con frontend (Next.js) y backend (Go) containerizado con Docker.

##Construir las Imágenes

### Opción 1: Construir todas las imágenes

```bash
docker-compose build
```

### Opción 2: Construir imagen específica

```bash
# Backend
docker build -t felipeeguia03/courses-backend:1.1 ./final/backend

# Frontend
docker build -t felipeeguia03/courses-frontend:1.1 ./final/frontend/front
```

Ejecutar los Contenedores

### Iniciar manualmente con docker-compose


# Todos los servicios
docker-compose up -d

# Solo servicios QA
docker-compose up -d db-qa backend-qa frontend-qa

# Solo servicios Producción
docker-compose up -d db-prod backend-prod frontend-prod
```

## 🌐 Acceder a la Aplicación

### Ambiente QA

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8081
- **Base de datos**: localhost:3307

### Ambiente Producción

- **Frontend**: http://localhost:3002
- **Backend API**: http://localhost:8082
- **Base de datos**: localhost:3308

## 🗄️ Conectarse a la Base de Datos

### QA

```bash
# MySQL CLI
mysql -h localhost -P 3307 -u qauser -p
# Password: qapass
# Database: courses_qa
```

### Producción

```bash
# MySQL CLI
mysql -h localhost -P 3308 -u produser -p
# Password: prodpass
# Database: courses_prod
```

### Credenciales de Root

- **QA**: root / rootpass
- **Producción**: root / rootpass

## ✅ Verificar que Todo Funciona

### 1. Verificar contenedores activos

```bash
docker-compose ps
```

### 2. Verificar logs

```bash
# Todos los servicios
docker-compose logs -f

# Servicio específico
docker-compose logs -f backend-qa
docker-compose logs -f frontend-qa
```

### 3. Health checks

```bash
# Backend QA
curl http://localhost:8081/health

# Backend Producción
curl http://localhost:8082/health
```

### 4. Verificar conectividad de BD

```bash
# QA
docker exec -it db-qa mysql -u qauser -pqapass -e "SHOW DATABASES;"

# Producción
docker exec -it db-prod mysql -u produser -pprodpass -e "SHOW DATABASES;"
```

## 🛠️ Comandos Útiles

```bash
# Parar todos los servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v

# Reconstruir e iniciar
docker-compose up --build -d

# Ver logs en tiempo real
docker-compose logs -f [servicio]

# Ejecutar comando en contenedor
docker exec -it [container_name] [comando]

# Limpiar todo (contenedores, imágenes, volúmenes)
./scripts/cleanup.sh
```

## 📁 Estructura de Puertos

| Servicio | QA   | Producción |
| -------- | ---- | ---------- |
| Frontend | 3001 | 3002       |
| Backend  | 8081 | 8082       |
| MySQL    | 3307 | 3308       |

## 🔧 Troubleshooting

- **Error de conexión a BD**: Verificar que el contenedor de BD esté completamente iniciado
- **Puerto ocupado**: Cambiar puertos en `docker-compose.yml`
- **Permisos**: Ejecutar `chmod +x scripts/*.sh` si hay problemas con scripts
