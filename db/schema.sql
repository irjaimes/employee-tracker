DROP DATABASE IF EXISTS employeeDB;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE DATABASE employeeDB;

USE employeeDB;

-- creates department table
CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

-- creates role table in employeeDB
CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (8,2) NOT NULL,
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- creates employee table in employeeDB
CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES role(id),
	FOREIGN KEY (manager_id) REFERENCES employee(id)
);
