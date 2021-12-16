const mysql = require("mysql");

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'ticketsDb',
  user: 'root',
  password: 'admin',
  insecureAuth: true
});

module.exports = connection;
