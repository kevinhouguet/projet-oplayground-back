const express = require('express');
const cors = require('cors');
const { swaggerUi, openapiSpecification } = require('./swagger');
const routers = require('./routers');

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
