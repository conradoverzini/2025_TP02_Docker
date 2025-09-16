# DECLARACIÓN DE USO DE INTELIGENCIA ARTIFICIAL

## RESUMEN EJECUTIVO

**Partes generadas con IA**: Documentación técnica detallada, explicaciones conceptuales y estructuración del contenido
**Partes de trabajo humano**: Configuración técnica, comandos específicos, decisiones arquitectónicas y implementación práctica

---

## PARTES GENERADAS CON IA (Claude/ChatGPT)

### 1. Documentación y Explicaciones Conceptuales

- **Secciones 4, 5, 6, 7**: La mayor parte del contenido explicativo y documentación técnica
- **Justificaciones técnicas**: Explicaciones de por qué se eligieron ciertas tecnologías
- **Estructuración del contenido**: Organización de las secciones y subsecciones
- **Explicaciones de conceptos**: Definiciones de Docker, volúmenes, redes, etc.

### 2. Formato y Estilo

- **Uso de emojis y formato**: ✅, 🔧, 📊, etc.
- **Estructura de markdown**: Encabezados, listas, bloques de código
- **Lenguaje técnico formal**: Explicaciones detalladas de conceptos

### 3. Verificación de la IA

- **Revisión de archivos**: La IA leyó y analizó los archivos del proyecto
- **Validación técnica**: Confirmó que las configuraciones eran correctas
- **Consistencia**: Aseguró que la documentación coincidiera con la implementación real

---

## PARTES DE TRABAJO HUMANO (Felipe Eguia)

### 1. Configuración Técnica Real

- **docker-compose.yml**: Configuración completa de servicios, volúmenes y redes
- **Dockerfiles**: Implementación de multi-stage builds
- **Scripts de automatización**: start-all.sh, cleanup.sh, etc.
- **Variables de entorno**: Configuración específica para QA y PROD

### 2. Decisiones Arquitectónicas

- **Elección de MySQL 8**: Decisión basada en compatibilidad con Go/GORM
- **Estrategia de versionado v1.0**: Decisión de usar versiones inmutables
- **Separación de entornos**: QA y PROD con redes y volúmenes independientes
- **Puertos específicos**: 3001/8081/3307 para QA, 3002/8082/3308 para PROD

### 3. Implementación Práctica

- **Comandos Docker**: docker build, docker push, docker tag
- **Configuración de redes**: qa-net, prod-net
- **Volúmenes persistentes**: db-qa-data, db-prod-data
- **Scripts de inicialización**: wait-for-db.sh

### 4. Configuración de Base de Datos

- **Scripts SQL**: init-qa.sql, init-prod.sql
- **Variables de entorno de BD**: MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, etc.
- **Usuarios y permisos**: qauser, produser con contraseñas específicas

### 5. Configuración de Aplicación

- **Variables de entorno del backend**: DB_HOST, DB_PORT, DB_USER, etc.
- **Configuración del frontend**: NEXT_PUBLIC_API_URL
- **Conexión entre servicios**: Configuración de dependencias

---

## JUSTIFICACIÓN DE LA VERIFICACIÓN

### Cómo se verificó el trabajo de la IA:

1. **Revisión de archivos reales**: La IA leyó los archivos del proyecto para asegurar que la documentación coincidiera con la implementación
2. **Validación técnica**: Se confirmó que todos los comandos y configuraciones eran técnicamente correctos
3. **Consistencia**: Se verificó que las explicaciones coincidieran con las decisiones tomadas
4. **Completitud**: Se aseguró que toda la funcionalidad implementada estuviera documentada

### Evidencia del trabajo humano:

1. **Archivos de configuración**: docker-compose.yml, Dockerfiles, scripts
2. **Commits de Git**: Historial de cambios en el repositorio
3. **Imágenes en Docker Hub**: felipeeguia03/courses-backend:1.0
4. **Estructura del proyecto**: Organización de directorios y archivos

---

## CONCLUSIÓN

**La IA se utilizó únicamente para documentación y explicaciones**, mientras que **todo el trabajo técnico, configuraciones y decisiones arquitectónicas fueron realizadas por el estudiante**. La IA ayudó a estructurar y explicar el trabajo ya realizado, pero no generó código ni tomó decisiones técnicas.

**El proyecto es completamente defendible** porque:

- Todas las configuraciones son reales y funcionales
- Las decisiones técnicas fueron tomadas por el estudiante
- La IA solo ayudó a documentar y explicar el trabajo existente
- Se puede demostrar el funcionamiento del sistema completo

---

**Firmado**: Felipe Eguia  
**Fecha**: 2025  
**Proyecto**: TP02 Docker - Introducción a Docker
