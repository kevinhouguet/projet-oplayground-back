const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const rateLimit = require('express-rate-limit');
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(limiter);
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
