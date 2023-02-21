require('dotenv').config();
const { Client } = require('pg');

const client = new Client();

client.connect()
  .then(() => console.log('DB Connexion : OK'))
  .catch((err) => console.error(`DB Connexion : ${err.message}`));
