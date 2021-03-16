USE employeeDB;

-- department table
INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

-- role table
INSERT INTO role (title, salary, department_id)
VALUES 
    ("Sales Lead", 80000, 1),
    ("Sales Rep", 60000, 1),
    ("Lead Senior Engineer", 18000, 2),
    ("Software Engineer", 120000, 2),
    ("Senior Accountant", 150000, 3),
    ("Accountant", 150000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Attorney", 198000, 4);


-- employee table 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Juan", "Pardo", 1, NULL),
    ("Bryan", "Cordozo", 2, 1),
    ("Britney", "Roberts", 2, 1),
    ("Kevin", "Krab", 3, NULL),
    ("Michelle", "Brown", 4, 4),
    ("Jill", "Logan", 4, 4),
    ("Don", "Garcia", 7, NULL),
    ("Chris", "Bull", 8, 7);