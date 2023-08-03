const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config();
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the employee_db database.`)
);
db.connect((err) => {
  if (err) throw err;
  userList();
});
function userList() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "what acction you want triggered?",

        choices: [
          "vew all departments",
          "vew all rolls",
          "vew all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.options) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee's role":
          updateEmployeeRole();
          break;
      }
    });
}
function vewAllTables() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
}
