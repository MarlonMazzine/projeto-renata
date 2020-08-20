const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'projeto-renata',
  password: 'password',
  port: 5432
})

module.exports = pool

// const { Client } = require('pg');

// const url = 'postgres://sbpsamfueobvgs:e08463833c0be19a775e3e8ce96cc9916d6303242aaeb0ea8c08a61a320b0fe6@ec2-3-91-112-166.compute-1.amazonaws.com:5432/ddgtj3gc8qqucl?useUnicode=true&characterEncoding=UTF-8'

// const client = new Client({
//   connectionString: process.env.CLEAR_DATABASE_URL || url,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// module.exports = client

// client.connect();

// var insert = 'INSERT INTO marcas (nome) VALUES (\'Achê\')'
// var select = 'SELECT * FROM marcas'

// client.query(select, (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });