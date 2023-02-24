const express = require('express');
const cors = require('cors');
const routers = require('./routers');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routers);

app.listen(port, () => {
  console.log(`Listenning on http://localhost:${port}`);
});
