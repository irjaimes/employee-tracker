const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Create Connection To Database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employeeDB'
});

// Start prompUser() upon successful connection to database
connection.connect((err) => {
  if (err) throw err;
  console.log('CONNECTION TO DATABASE SUCCESSFUL!');
  promptUser();
});

// Prompt user 
const promptUser = () => {
  inquirer.prompt({
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: [
      "View Employees",
      "View Roles",
      "View Departments",
      "Add Employee",
      "Add Role",
      "Add Department",
      "Update Employee Role",

      // BONUS
      // "Remove Employees",
      // "Add Role",
      // "Remove Role",
      // "Update Employee Manager",
      "End"]
  })
    // Run a specific function based on case selected
    .then(function ({ task }) {
      switch (task) {
        // 
        case "View Employees":
          queryTable("employee", `SELECT * FROM employee`);
          break;
        case "Add Employee":
          addEmployee();
          break;

        case "View Departments":
          queryTable("department", `SELECT * from department`)
          break;
        case "Add Department":
          addDepartment();
          break;

        case "View Roles":
          queryTable("role", `SELECT * from role`);
          break;
        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        case "End":

          connection.end();
          break;
      }
    });
}

// Function to display tables
function queryTable(tableName, queryString) {

  let query = queryString

  connection.query(query, (err, res) => {
    if (err) throw err;

    console.log("==============================================")
    console.table(res);
    console.log("^^^^^^ Displaying " + tableName + " table above! ^^^^^^")
    console.log("==============================================")

    promptUser()
  });
  // console.log(query.sql);
}

//========================= EMPLOYEES ============================
//  Add employee function
function addEmployee() {

  let employeeTbl = 'SELECT * FROM employee'

  connection.query(employeeTbl, (err, res) => {
    if (err) throw err;
    console.table(res);
  });

  getRole();

}

// Get role function
function getRole() {
  let roleTable = `SELECT role.id, role.title FROM role`

  connection.query(roleTable, (err, res) => {
    if (err) throw err;

    let roleChoices = res.map(({ id, title }) => ({
      value: id,
      title: `${id} ${title}`
    }));

    //console.log("==============================================")
    console.table(res);
    //console.log("Role Choice: " + roleChoices);

    promptAddEmployee(roleChoices);

  });
}

// Add employee inquiry
function promptAddEmployee(roleChoices) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Employee first name: "
      },
      {
        type: "input",
        name: "last_name",
        message: "Employee last name: "
      },
      {
        type: "list",
        name: "role_id",
        message: "Employee role: ",
        choices: roleChoices
      },
      {
        type: "input",
        name: "manager_id",
        message: "Manager id?",
      },
    ])
    .then((answer) => {
      console.log(answer)
      try {
        var query = connection.query('INSERT INTO employee SET ?', answer,
          (error, results, fields) => {
            if (error) throw error;
          });
        //console.log(query.sql)

        // Update table and display
        updateTable = 'SELECT * FROM employee'
        connection.query(updateTable, (err, res) => {
          console.table(res);
        });
      }
      catch (error) {
        console.log("Role could not be added, try again!");
      }
      promptUser();
    });
}

function updateEmployee() {
  var employeeTable = 'SELECT * FROM employee'
  connection.query(employeeTable, function (err, res) {
    console.table(res);
  });

  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Please enter the employee id you wish to update: '
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter new role id: '
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter new manager id: '
    }
  ]).then((answer) => {
    console.log(answer);

    connection.query(`UPDATE employee SET role_id='${answer.role_id}' WHERE id='${answer.id}'`)
    //if (err) throw err;

    // Update table and display
    updateTable = 'SELECT * FROM employee'
    connection.query(updateTable, (err, res) => {
      console.table(res);

    });
    promptUser();
  })
}

//========================= ROLES ============================

// function to add a role
function addRole() {
  var roleTable = 'SELECT * FROM role'
  connection.query(roleTable, (err, res) => {
    console.table(res);
  })

  var query = `SELECT department.id, department.name from department`

  connection.query(query, (err, res) => {
    if (err) throw err;

    const deptChoices = res.map(({ id, name }) => ({
      value: id, name: `${id} ${name}`
    }));

    promptAddRole(deptChoices);
  });
}

function promptAddRole(deptChoices) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Title for role?"
      },
      {
        type: "input",
        name: "salary",
        message: "Salary of role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Department of role?",
        choices: deptChoices
      },
    ])
    .then((answer) => {
      console.log(answer)
      try {
        var query = connection.query('INSERT INTO role SET ?', answer,
          (error, results, fields) => {
            if (error) throw error;

          });
      }
      catch (error) {
        console.log("Role could not be added, please try again!");
      }

      promptUser();
    });
}

//========================= DEPARTMENT ============================

// function to add a new department
function addDepartment() {

  let query = 'SELECT * FROM department'
  connection.query(query, (err, res) => {

    console.table(res);

  });

  addDeptPrompt();
}
// add department inquiry
function addDeptPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Department name?"
      },
    ])
    .then((answer) => {
      console.log(answer)
      try {
        var query = connection.query('INSERT INTO department SET ?', answer,
        (error, results, fields) => {
          if (error) throw error;

        });
        //console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
      }
      catch (error) {
        console.log("Department could not be added, try again");
      }

      promptUser();
    });
}

//promptUser();