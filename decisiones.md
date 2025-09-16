# Trabajo Práctico N°2 - Introducción a Docker

## 1. Elección de la aplicación

Decidimos usar un proyecto pasado de la facultad, originalmente desarrollado por Conrado Verzini.  
El repositorio original se encuentra en:  
[https://github.com/conradoverzini/2025_TP02_Docker](https://github.com/conradoverzini/2025_TP02_Docker)

Elegimos esta aplicación porque ya tiene una base sólida de código, lo que nos permitió enfocarnos en aprender Docker y la containerización en lugar de empezar un proyecto desde cero.  
Además, mantener el historial de commits es útil para ver la evolución del proyecto.

Para cumplir con la consigna de tener un repositorio propio, realicé un **fork** del repositorio original.  
Mi copia del repositorio está en:  
[https://github.com/felipeeguia03/2025_TP02_Docker](https://github.com/felipeeguia03/2025_TP02_Docker)

Después del fork, actualicé el remote en mi repositorio local para apuntar a mi fork:

git remote set-url origin https://github.com/felipeeguia03/2025_TP02_Docker.git

## 2. Construir una imagen personalizada

#2.1 Separación Frontend / Backend
Decidimos crear dos Dockerfiles, uno para el frontend (Next.js / React) y otro para el backend (Go), siguiendo las buenas prácticas de Docker:
Separación de responsabilidades: cada contenedor hace una sola cosa.
Escalabilidad: permite levantar varios contenedores de backend sin afectar el frontend.
Mantenimiento: facilita actualizar una parte sin afectar la otra.
#2.2 Elección de imágenes base
Frontend: node:18-alpine
Backend: golang:1.22-alpine (build) + alpine:latest (runtime)
Justificación de Alpine:
✅ Ligera (~5 MB frente a ~100 MB de Ubuntu) → descarga y arranque rápido.
✅ Menor superficie de ataque → más segura.
✅ Eficiente → consume menos recursos de memoria y CPU.
❌ Desventaja: trae menos herramientas por defecto (apk vs apt), pero suficiente para nuestro proyecto.
#2.3 Multi-stage build
Se utilizó multi-stage build en ambos Dockerfiles:
Frontend:
Etapa builder: instalar dependencias y compilar la app.
Etapa runner: copiar solo los archivos necesarios y ejecutar la app con un usuario no-root.
Backend:
Etapa builder: compilar el binario estático de Go.
Etapa runner: ejecutar solo el binario en una imagen mínima de Alpine con usuario no-root.

## 3 Publicación de imágenes en Docker Hub

Para este proyecto, se construyeron y publicaron las imágenes de backend y frontend:
Backend: felipeeguia03/courses-backend:1.0
Frontend: felipeeguia03/courses-frontend:1.0
Estas imágenes se subieron a Docker Hub con los siguientes comandos:

# Construcción de imágenes

docker build -t felipeeguia03/courses-backend:1.0 ./backend
docker build -t felipeeguia03/courses-frontend:1.0 ./frontend

# Subida a Docker Hub

docker push felipeeguia03/courses-backend:1.0
docker push felipeeguia03/courses-frontend:1.0

###Estrategia de versionado
Se utilizó un esquema simple y claro:
1.0 → primera versión estable del proyecto.
Futuras versiones se pueden numerar como 1.1, 1.2, etc.
Se puede usar latest para apuntar siempre a la versión más reciente en Docker Hub.
Ventajas:
QA y PROD pueden usar la misma imagen, cambiando únicamente variables de entorno y puertos, evitando inconsistencias.
Facilita la reproducibilidad del entorno en cualquier máquina.
Permite un control claro de versiones y actualizaciones.

##4. Integración de base de datos en contenedor
4.1 Elección de la base de datos: MySQL 8
Decidimos usar MySQL 8 por:
✅ Compatibilidad con Go: Funciona muy bien con GORM, que usamos en el backend.
✅ Madurez y estabilidad: Base de datos relacional probada.
✅ Performance: Rinde bien en aplicaciones web con consultas y transacciones.
✅ Ecosistema: Amplia documentación, herramientas de administración y soporte comunitario.
✅ Licencia gratuita: Community Edition open source.
✅ Imagen oficial Docker: Mantenida y actualizada regularmente.
4.2 Persistencia de datos
Se configuraron volúmenes nombrados para que los datos sobrevivan a reinicios:
db-qa-data → entorno QA
db-prod-data → entorno producción
Beneficios:
Persistencia y respaldo de datos
Separación total entre QA y PROD
Fácil escalabilidad y migración entre hosts
4.3 Conexión de la aplicación al contenedor
El backend se conecta al contenedor de MySQL usando variables de entorno (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME).
Permite usar la misma imagen del backend tanto en QA como en PROD, cambiando únicamente las variables de entorno.
Garantiza que la aplicación se conecte correctamente al entorno deseado sin modificar el código.
4.4 Redes y aislamiento
Se crearon redes Docker separadas:
qa-net → para QA
prod-net → para PROD
Beneficios:
Aislamiento entre entornos
Seguridad y resolución de nombres por contenedor
Escalabilidad al agregar más servicios
4.5 Health checks
Se incluyó un script wait-for-db.sh que espera a que la base de datos esté lista antes de iniciar el backend.
Beneficios:
Evita errores de conexión al inicio
Garantiza que el backend solo arranque cuando la base de datos esté disponible
