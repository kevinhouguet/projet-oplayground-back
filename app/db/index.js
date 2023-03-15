require('dotenv').config();
const { Client } = require('pg');

// https://node-postgres.com/apis/client
let client;

if (process.env.NODE_ENV === 'production') {
  client = new Client({
    connectionString: `${process.env.DATABASE_URL}`,
    ssl: true,
  });
} else {
  client = new Client();
}

client.connect()
  .then(() => console.log('DB Connexion : OK'))
  .catch((err) => console.error(`DB Connexion : ${err.message}`));

module.exports = client;
