//MySql
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "database-1.ccri4cpdf7vk.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "agenda_data",
});


//Check connect
connection.connect((error) => {
  if (error) throw error;
  console.log("Database server running!");
});

module.exports = connection;
