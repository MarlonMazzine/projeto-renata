// const { Pool } = require('pg')

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'projeto-renata',
//   password: 'password',
//   port: 5432
// })

// module.exports = pool

const { Pool } = require('pg');

const url = 'postgres://pvbyjombciqqro:a377bd1ab95dda847b2087bc5334535684fe9478a93eb0d2a9b8d712c5213b29@ec2-52-86-116-94.compute-1.amazonaws.com:5432/dfd42ptdsoq6a?useUnicode=true&characterEncoding=UTF-8'

const pool = new Pool({
  connectionString: process.env.CLEAR_DATABASE_URL || url,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool

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