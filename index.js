const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Create Connection To Database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connection succesfull!');
});

