const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const routers = require('./routers');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "O'playground API",
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3002/api',
        description: "O'playground API",
      },
    ],
  },
  apis: ['app/*/*/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(cors({
  origin: '*',
}));

app.use('/docs', express.static('docs'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(openapiSpecification));

app.use(routers);

const port = process.env.PORT;
const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL_PROD : process.env.BASE_URL_DEV;

app.listen(port, () => {
  console.log(`Listenning on ${baseUrl}:${port}`);
});
