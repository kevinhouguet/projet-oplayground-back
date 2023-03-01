const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const routers = require('./routers');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "O'playground",
      version: '1.0.0',
    },
  },
  apis: ['app/*/*/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL_PROD : process.env.BASE_URL_DEV;

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(cors({
  origin: '*',
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(openapiSpecification));

app.use(routers);

app.listen(port, () => {
  console.log(`Listenning on ${baseUrl}:${port}`);
});
