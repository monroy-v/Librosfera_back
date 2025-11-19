# Book Exchange API

## Setup rápido

1. Copia `.env.example` a `.env` y completa valores.
2. Levanta Postgres: `docker-compose up -d` (opcional).
3. `npm install`
4. `npm run start:dev`
5. Abre `http://localhost:3000/docs` para Swagger

En producción, desactiva `synchronize: true` y usa migraciones.
