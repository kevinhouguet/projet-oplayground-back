require('dotenv').config();
const { Client } = require('pg');

let client;

if (process.env.NODE_ENV === 'production') {
  client = new Client();
} else {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
}
console.log(process.env.DATABASE_URL);
console.log(process.env.NODE_ENV);

client.connect()
  .then(() => console.log('DB Connexion : OK'))
  .catch((err) => console.error(`DB Connexion : ${err.message}`));

module.exports = client;
