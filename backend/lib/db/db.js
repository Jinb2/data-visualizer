const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.LOCALHOST,
  port: 5432,
  database: "datavisualizer",
});

module.exports = pool;
