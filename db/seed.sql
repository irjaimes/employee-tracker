USE employeeDB;
-- department table

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

-- role table
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES("Lead Engineer", 18000, 2);
INSERT INTO role (title, salary, department_id)
VALUES("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES("Accountant", 150000, 3);
INSERT INTO role (title, salary, department_id)
VALUES("Legal Team Lead", 250000, 4);

-- employee table 
INSERT INTO employee (first_name, last_name, title_id, manager_id)
VALUES ("Juan", "Pardo", 1, 3);
INSERT INTO employee (first_name, last_name, title_id, manager_id)
VALUES ("Bryan", "Cordozo", 2, 1);
INSERT INTO employee (first_name, last_name, title_id, manager_id)
VALUES ("Britney", "Roberts", 3, null);
INSERT INTO employee (first_name, last_name, title_id, manager_id)
VALUES ("Kevin", "Krab", 4, 3);
INSERT INTO employee (first_name, last_name, title_id, manager_id)
VALUES ("Michelle", "Brown", 5, null);
INSERT INTO employee (first_name, last_name, title_id, manager_id)
VALUES ("Jill", "Logan", 2, null);
INSERT INTO employee (first_name, last_name, title_id, manager_id)
VALUES ("Don", "Garcia", 4, 7);
INSERT INTO employee (first_name, last_name, title_id, manager_id)
VALUES ("Chris", "Bull", 1, 2);