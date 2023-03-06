# API O'playground

## Presentation

...

## Tech

- express
- ejs
- dotenv
- eslint
- sqitch
- pg
- cors
- joi
- jsonwebtoken
- node-fetch
- swagger jsdoc / swagger ui express

## How to install it ?

```javascript
npm install
```

1. You must have a postgres server side : https://www.postgresql.org/download/
2. Duplicate .env.example and change var with yours

```bash
# Server express side
PORT= 
NODE_ENV= dev
BASE_URL_DEV=localhost
BASE_URL_PROD=https://oplaygroundapi.herokuapp.com
NODE_TLS_REJECT_UNAUTHORIZED=0
ACCESS_TOKEN_SECRET=
ASK_RESET_PASSWORD_TOKEN=

# Postgres server side : https://node-postgres.com/apis/client
PGHOST=
PGDATABASE = 
PGPORT=
```

## How to run it ?

```javascript
npm start
```

## How to seed fake data ?

```javascript
npm run seed
```

/ ! \ Disclaimer : you need to have nodejs version >= 18 because of fetch native module.

## API architecture

- app
 - controllers
 - db
 - errors
 - helpers
 - routers
 - swagger
 - validation
 - views
- data
- migrations

## Routes

/api/docs

## DB
