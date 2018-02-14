DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Television 60_inch", "Electronics", 975.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo", "Electronics", 84.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire HD 10 Tablet", "Electronics", 119.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Weber Grill", "Home", 549.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lawn Mower", "Home", 326.98, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Instant Pot", "Home", 99.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Connect 4", "Toys", 8.79, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Toys", 19.99, 3);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "Pets", 38.67, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Food", "Pets", 17.49, 3);

SELECT * FROM products;