USE employee_db;

INSERT INTO department(name)
VALUES ("HR"),("Sales"),("Inbound");

INSERT INTO role(title, salary ,department_id)
VALUES ("Operations Manager",80000, 1),("Head Sales Manager",79000,2),("Inventory Manager", 50000,3);

INSERT INTO employee (first_name, last_name ,role_id,manager_id)
VALUES ("Jose", "Alberto",1, NULL),("Nathan","Rivera",2,NULL),("Irvin","Ocacio", 3,NULL);