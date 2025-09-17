# Trabajo Práctico N°2 - Introducción a Docker

## 1. Elección de la aplicación

Decidimos usar un proyecto pasado de la facultad, originalmente desarrollado por Conrado Verzini.  
El repositorio original se encuentra en:  
[https://github.com/conradoverzini/2025_TP02_Docker](https://github.com/conradoverzini/2025_TP02_Docker)

Elegimos esta aplicación porque ya tiene una base sólida de código, lo que nos permitió enfocarnos en aprender Docker y la containerización en lugar de empezar un proyecto desde cero.  

Para cumplir con la consigna de tener un repositorio propio, realicé un FORK del repositorio original.  
Mi copia del repositorio está en:  
[https://github.com/felipeeguia03/2025_TP02_Docker](https://github.com/felipeeguia03/2025_TP02_Docker)

Después del fork, actualicé el remote en mi repositorio local para apuntar a mi fork:

git remote set-url origin https://github.com/felipeeguia03/2025_TP02_Docker.git

## 2. Construir una imagen personalizada

- 2.1. Separación Frontend / Backend
Decidimos crear dos Dockerfiles, uno para el frontend (Next.js / React) y otro para el backend (Go), siguiendo las buenas prácticas de Docker:
Separación de responsabilidades: cada contenedor hace una sola cosa.
Escalabilidad: permite levantar varios contenedores de backend sin afectar el frontend.
Mantenimiento: facilita actualizar una parte sin afectar la otra.
- 2.2 Elección de imágenes base
Frontend: node:18-alpine
Backend: golang:1.22-alpine (build) + alpine:latest (runtime)
Justificación de Alpine: Es más ligera que Ubuntu proporcionando una descarga y arranque rapido, consumiendo menos recursos de memoria y CPU

## 3 Publicación de imágenes en Docker Hub

Para este proyecto, se construyeron y publicaron las imágenes de backend y frontend:
Backend: felipeeguia03/courses-backend:1.1
Frontend: felipeeguia03/courses-frontend:1.1
Estas imágenes se subieron a Docker Hub con los siguientes comandos:
- Construcción de imágenes:

docker build -t felipeeguia03/courses-backend:1.1 ./final/backend
docker build -t felipeeguia03/courses-frontend:1.1 ./final/frontend/front

- Subida a Docker Hub:
docker push felipeeguia03/courses-backend:1.1
docker push felipeeguia03/courses-frontend:1.1

###Estrategia de versionado
Se uso un esquema simple:
1.1 → versión actual estable del proyecto.
Cualquier futura versionse puede numerar como 1.2, 1.3, etc.
Se puede usar latest para apuntar siempre a la versión más reciente en Docker Hub.
Ventajas:
QA y PROD pueden usar la misma imagen y solo se tiene que cambiar únicamente las variables de entorno y puertos lo que ayuda a reproducir lo mismo en otras máquinas con Docker

##4. Integración de base de datos en contenedor
- 4.1 Elección de la base de datos: MySQL 8
Decidimos usar MySQL 8 por: La compatibilidad con GORM debido al uso de Go para el backend, ya habíamos usado MySQL, es simple y existe una imagen oficial de docker que es mantenida por la empresa.

- 4.2 Persistencia de datos
Con respecto a la persistencia de datos optamos por configurar volúmenes para que los datos sobrevivan a reinicios de los propios contenedores:
db-qa-data → entorno QA
db-prod-data → entorno producción
Beneficios:
Persistencia y respaldo de datos
Separación total entre QA y PROD
Fácil escalabilidad y migración entre hosts
- 4.3 Conexión de la aplicación al contenedor
El backend se conecta al contenedor de MySQL usando variables de entorno (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME). Para cada contenedor
permite usar la misma imagen del backend tanto en QA como en PROD, cambiando únicamente las variables de entorno.
- 4.4 Redes y aislamiento
Se crearon redes Docker separadas:
qa-net → para QA
prod-net → para PROD

## 5 5. Configurar QA y PROD con la misma imagen
- 5.1 Estrategia de una sola imagen para múltiples entornos
Como pedía el TP decidimos usar la misma imagen Docker para QA y PROD, donde solo cambiando las variables de entorno levantamos los respectivos contenedores de QA y PROD. Esto tiene las ventajas de ejecutar el mismo código para ambas ahorrando tiempo de build y asegurarse de que lo que funciona en QA también funciona en PROD
- 5.2 Variables de entorno del Backend
# Backend QA

backend-qa:
image: felipeeguia03/courses-backend:1.1
environment:
DB_HOST: db-qa
DB_PORT: 3306
DB_USER: qauser
DB_PASSWORD: qapass
DB_NAME: courses_qa
ENV: qa
ports: - "8081:8080"

# Backend PROD

backend-prod:
image: felipeeguia03/courses-backend:1.1
environment:
DB_HOST: db-prod
DB_PORT: 3306
DB_USER: produser
DB_PASSWORD: prodpass
DB_NAME: courses_prod
ENV: production
ports: - "8082:8080"

- 5.3 Variables de entorno del Frontend
El frontend se conecta al backend correspondiente según el entorno:

# Frontend QA

frontend-qa:
image: felipeeguia03/courses-frontend:1.1
ports: - "3001:3000"

# Frontend PROD

frontend-prod:
image: felipeeguia03/courses-frontend:1.1
ports: - "3002:3000"
-5.4 Ejecución simultánea y comandos 
Podemos levantar ambos entornos con:
docker-compose up -d
Resultado:
QA: frontend 3001, backend 8081, DB 3307
PROD: frontend 3002, backend 8082, DB 3308

volumes:
db-qa-data:
db-prod-data:

## 6. Preparar un entorno reproducible con docker-compose

-6.1 Estrategia general
Armamos un docker-compose.yml que levanta QA y PROD junto con sus bases de datos, usando volúmenes para persistencia y redes separadas. Como siempre, todo se configura mediante variables de entorno, así la misma imagen corre en ambos entornos sin cambios en el código.
- 6.2 Servicios principales
Sin ser reiterativos, identificamos los princiaples servicios de nuestra aplicación:
Bases de datos: MySQL 8, cada entorno con su DB y volumen propio.
Backend: misma imagen para QA y PROD
Frontend: se conecta al backend correspondiente usando NEXT_PUBLIC_API_URL.
Los puertos son únicos por entorno para poder correr ambos a la vez: con CORS permitimos que ambos frontend puedan conectarse a los backend a pesar de la diferencia de puertos

### 7. Crear una versión etiquetada

- 7.1 Estrategia de versionado
Para el proyecto decidimos usar una versión estable para la imagen del backend, siguiendo un esquema de versionado simple y claro: v1.1.
La idea es que esta versión siempre apunte al mismo código, asegurando que QA y PROD estén corriendo exactamente lo mismo. Esto tiene la ventaja de que aunque se haga un nuevo build la version v1.1 no va a cambiar y en caso de que haya errores se puede hacer rollback a versiones antiguas
- 7.2 Cómo se creó y publicó la versión
Pasos realizados:

docker build -t felipeeguia03/courses-backend:1.1 ./final/backend
docker tag felipeeguia03/courses-backend:1.1 felipeeguia03/courses-backend:v1.1
docker push felipeeguia03/courses-backend:1.1
docker push felipeeguia03/courses-backend:v1.1
Con esto, la misma imagen quedó disponible en Docker Hub con dos tags: 1.1 y v1.1. Ambos apuntan al mismo artefacto.

-7.3 Uso de la versión en docker-compose
En el docker-compose.yml actual, tanto QA como PROD usan esta misma versión:
backend-qa:
image: felipeeguia03/courses-backend:1.1
backend-prod:
image: felipeeguia03/courses-backend:1.1


## DECLARACION USO DE IA

Declaración de uso de IA
En la realización de este proyecto, utilizamos herramientas de inteligencia artificial como ChatGPT y Cursor para asistir en la redacción de la documentación y en la estructuración de explicaciones técnicas, especialmente en los puntos 4, 5, 6 y 7 del entregable.
Justificación y verificación
Lo que hicimos personalmente:
Desarrollé todo el backend y frontend en Go y React. El año pasado
Armé los Dockerfiles para backend y frontend, asegurando que compilara correctamente.
Configuré docker-compose.yml con las bases de datos, backends y frontends para QA y PROD.
Probamos localmente que los contenedores se conectaran correctamente entre sí y con la base de datos aún cuando hubo errores de configuración como que quería conectar a MARIADB debido a la configuración de Alpine
Hicimos push de las imágenes a Docker Hub y etiquetamos la versión v1.1.
Comprobamos que los logs de los contenedores fueran correctos y que los servicios estuvieran funcionando en los puertos configurados con docker desktop
Realizmos la integración de variables de entorno para diferenciar QA y PROD.
Lo que hizo Chatgpt y Cursor:
Redacción de los puntos de documentación 4, 5, 6 y 7 con un estilo más uniforme y explicativo
Ejemplos de bloques de docker-compose.yml, comandos de Docker y scripts para ilustrar los pasos de forma clara.
Ayuda con comandos para velocidad del armado de los contenedores.
Debugg de Cors
Explicación de conceptos de versionado de imágenes y estrategias de redes en Docker.
Organización de la documentación de manera que quedara consistente, con subtítulos y listados de ventajas.

##EVIDENCIA DE FUNCIONAMIENTO

Frontend 3001:
![](./images/F3001.png)
Frontend 3002:
![](./images/F3002.png)
Backend 8081:
![](./images/health-8081.png)
Ambos Backends:
![](./images/Backends.png)
Conexion qa-db:
![](./images/Conexion_qa-db.png)
Contenedores:
![](./images/DockerDesktop.png)
Terminal qa-db:
![](./images/qa-db.png)
Reinicio Codigo:
![](./images/reinicio.png)
Reinicio contenedores:
![](./images/ReinicioContenedores.png)
Datos persistentes:
![](./images/Persistentes.png)
