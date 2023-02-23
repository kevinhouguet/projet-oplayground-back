require('dotenv').config();
const { Client } = require('pg');

let client;

if (process.env.NODE_ENV === 'production') {
  client = new Client({
    connectionString: `${process.env.DATABASE_URL}`,
    ssl: true,
  });
  console.log('prod')
} else {
  client = new Client();
  console.log('dev')
}

client.connect()
  .then(() => console.log('DB Connexion : OK'))
  .catch((err) => console.error(`DB Connexion : ${err.message}`));

module.exports = client;
