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
        message: "what action you want triggered?",

        choices: [
          "View all departments",
          "View all role",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.options) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all role":
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
        case "Update an employee role":
          updateEmployeeRole();
          break;
      }
    });
}
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    userList()
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    userList()
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    userList()
  });
}

function addDepartment(){
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "what is the name of the department you will like to add?",

        
        
      },
    ]).then((answer) => {
      db.query("INSERT INTO department SET ?", answer,function (err, results) {
        console.table(results);
        userList()
      }); 

    })
}
function addRole(){
  db.query("SELECT * FROM department", function (err, results){
    let departmentArray = results.map((dpt) => ({name:dpt.name,value:dpt.id}))
  
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "what is the title of your role?",
       },
      {
        type: "input",
        name: "salary",
        message: "what is the salary of your role?",
       },
      {
        type: "list",
        name: "department_id",
        message: "what department is your role in?",

        choices: departmentArray
       },
    ]).then((answer) => {
      db.query("INSERT INTO role SET ?", answer,function (err, results) {
        console.table(results);
        userList()
      }); 

    })})
}