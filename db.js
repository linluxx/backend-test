const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  password: "root",
  host: "localhost",
  database: "postgres",
  port: 5432,
});

module.exports = pool;
