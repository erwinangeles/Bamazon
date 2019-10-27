DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price FLOAT,
  stock_quantity INTEGER(11)
);

