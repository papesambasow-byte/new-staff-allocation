const mysql = require("mysql");
const sshConnection = require("./sshdb");

const dbConfig = {
  host: "172.25.160.235",
  user: "root",
  password: "rootdb@dfit",
  database: "staffAllcoationDB",
};


const dbConnection = mysql.createConnection(dbConfig);
dbConfig.stream = sshConnection;

module.exports =dbConnection


