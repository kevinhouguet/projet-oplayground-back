const express = require('express');
const routers = require('./routers');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL_PROD : process.env.BASE_URL_DEV;

app.set('view engine', 'ejs');
app.set('views', './app/views');

// cors

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(routers);

app.listen(port, () => {
  console.log(`Listenning on ${baseUrl}:${port}`);
});
