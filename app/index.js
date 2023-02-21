const express = require('express');
const routers = require('./routers');
require('dotenv').config();

const app = express();
const port = process.env.PORT ?? 3000;

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(routers);

app.listen(port, () => {
  console.log(`Listenning on https://oplaygroundapi.herokuapp.com:${port}`);
});
