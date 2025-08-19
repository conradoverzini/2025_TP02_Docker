# Trabajo Práctico - Introducción a Docker y DevOps

Este proyecto implementa una plataforma de cursos online con **ambientes separados** para desarrollo y QA, utilizando Docker para la containerización.

## 🏗️ Arquitectura

### Ambientes

- **Desarrollo**: Frontend (8080), Backend (5000), DB (7000)
- **QA**: Frontend (8081), Backend (5001), DB (7001)

### Tecnologías

- **Backend**: Go (Gin framework)
- **Frontend**: React + Next.js
- **Base de datos**: MySQL 8.0
- **Containerización**: Docker + Docker Compose

## 🚀 Inicio Rápido

### Prerrequisitos

- Docker Desktop instalado
- Git

### Comandos de inicio

```bash
# Dar permisos de ejecución a los scripts
chmod +x scripts/*.sh

# Iniciar solo ambiente de desarrollo
./scripts/start-dev.sh

# Iniciar solo ambiente de QA
./scripts/start-qa.sh

# Iniciar todos los ambientes
./scripts/start-all.sh

# Limpiar contenedores
./scripts/cleanup.sh
```

## 📊 Puertos y URLs

### Ambiente de Desarrollo

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5002
- **Base de datos**: localhost:7002

### Ambiente de QA

- **Frontend**: http://localhost:8081
- **Backend API**: http://localhost:5003
- **Base de datos**: localhost:7003

## 🔧 Comandos Docker útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend-dev

# Reconstruir imágenes
docker-compose up --build

# Parar todos los servicios
docker-compose down

# Parar y eliminar volúmenes (resetear DBs)
docker-compose down -v

# Ver contenedores ejecutándose
docker ps

# Acceder a un contenedor
docker exec -it backend-dev sh
```

## 🧪 Conceptos DevOps implementados

### 1. **QA (Quality Assurance)**

- Ambiente separado para testing
- Base de datos independiente
- Datos de prueba específicos
- Permite probar cambios sin afectar desarrollo

### 2. **Pipeline de Desarrollo**

```
Código → Build → Test → Deploy (Dev) → Deploy (QA) → Deploy (Prod)
```

### 3. **Containerización**

- **Imágenes**: Plantillas para crear contenedores
- **Contenedores**: Instancias ejecutándose de las imágenes
- **Docker Compose**: Orquestación de múltiples servicios

### 4. **Networking**

- Redes separadas para Dev y QA
- Comunicación entre servicios
- Aislamiento de ambientes

### 5. **Volúmenes**

- Persistencia de datos de base de datos
- Compartir archivos entre host y contenedores
- Separación de uploads por ambiente

## 📁 Estructura del Proyecto

```
├── docker-compose.yml          # Orquestación de servicios
├── scripts/                    # Scripts de automatización
│   ├── start-dev.sh           # Iniciar desarrollo
│   ├── start-qa.sh            # Iniciar QA
│   ├── start-all.sh           # Iniciar todos
│   ├── cleanup.sh             # Limpiar contenedores
│   ├── init-dev.sql           # Inicialización DB dev
│   └── init-qa.sql            # Inicialización DB qa
├── final/
│   ├── backend/
│   │   ├── Dockerfile         # Imagen del backend
│   │   └── .dockerignore      # Archivos a ignorar
│   └── frontend/front/
│       ├── Dockerfile         # Imagen del frontend
│       └── .dockerignore      # Archivos a ignorar
└── uploads-dev/               # Archivos subidos (dev)
└── uploads-qa/                # Archivos subidos (qa)
```

## 🔍 Monitoreo y Debugging

### Verificar servicios

```bash
# Verificar que todos los contenedores estén corriendo
docker-compose ps

# Verificar logs de errores
docker-compose logs --tail=50
```

### Conectar a base de datos

```bash
# Desarrollo
mysql -h localhost -P 7000 -u devuser -p courses_dev

# QA
mysql -h localhost -P 7001 -u qauser -p courses_qa
```

## 🛠️ Desarrollo

### Modificar código

1. Los volúmenes están configurados para hot-reload
2. Los cambios se reflejan automáticamente
3. Para cambios en Dockerfile, reconstruir: `docker-compose up --build`

### Variables de entorno

- Configuradas en `docker-compose.yml`
- Diferentes para cada ambiente
- Incluyen credenciales de DB y URLs

## Integrantes:

- Felipe Eguia
- Conrado Verzini Colome
