

DROP DATABASE IF EXISTS bamazon

CREATE DATABASE bamazon




USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)

);



USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES ("Plumbus", "Household", 16, 1000), ("Widget", "Manufacturing", 50, 500), ("Portal Gun", "Travel", 525000, 5), ("Raspberry Pi", "Electronics", 40, 4000 ), ("White Tube Socks", "Clothing", 20, 200), ("Meditations - Marcus Aurelius", "Books", 10, 100), ("Lord of the Rings", "Books", 20, 200), ("HP Envy Laptop", "Electronics", 550, 10), ("LG 60inch TV", "Electronics", 1500, 30), ("Coffee Table", "Household", 350, 10);

SELECT * FROM products











