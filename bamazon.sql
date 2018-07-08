DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(20) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (17, "Calculator", "Electronics", 35.99, 100),
(22, "Laptop", "Electronics", 899.00, 10),
(27, "Television", "Electronics", 449.00, 20),
(32, "Circular Saw", "Hardware", 119.99, 35),
(37, "Plunge Router", "Hardware", 149.49, 7),
(42, "22 Inch Auger", "Hardware", 229.00, 1),
(47, "Outdoor Patio Suite", "Garden", 1499.00, 1),
(52, "Keurig Coffeemaker", "Appliances", 99.99, 5),
(57, "Toaster", "Appliances", 29.99, 20),
(62, "Breville Wok", "Appliances", 199.00, 4)
;