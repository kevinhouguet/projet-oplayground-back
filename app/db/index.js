require('dotenv').config();
const { Client } = require('pg');

let client;

if (process.env.NODE_ENV === 'production') {
  client = new Client({
    connectionString: `${process.env.DATABASE_URL}`,
    ssl: true,
  });
} else {
  // client = new Client();
  client = new Client({
    connectionString: 'postgres://mpqwdzniajshyx:614201553d71c41ae1a7c42fc5da960fe6fdd57a833f982072413f4081491652@ec2-34-246-227-219.eu-west-1.compute.amazonaws.com:5432/db522t62llgr1q',
    ssl: true,
  });
}
console.log(process.env.DATABASE_URL);
console.log(process.env.NODE_ENV);

client.connect()
  .then(() => console.log('DB Connexion : OK'))
  .catch((err) => console.error(`DB Connexion : ${err.message}`));

module.exports = client;
