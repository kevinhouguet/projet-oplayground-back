const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
  res.send('Coucou');
});

app.listen(port, () => {
  console.log(`Listenning on http://localhost:${port}`);
});
