const mysql = require('mysql2');
const inquirer = require("inquirer")
require("dotenv").config()
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the employee_db database.`)
  );
  
  db.query('SELECT * FROM students', function (err, results) {
    console.log(results);
  });