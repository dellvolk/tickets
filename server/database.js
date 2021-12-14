const mysql = require("mysql");

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'lab1',
  user: 'root',
  password: 'admin',
  insecureAuth: true
});

module.exports = connection;
