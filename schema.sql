DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Xbox One X", "Electronics", 488.45, 30), ("Echo (2nd Gen)", "Electronics", 99.99, 140), 
("Ring Video Doorbell", "Electronics", 99.99, 60), ("The Great Gatsby", "Books", 10.20, 100), 
("The Subtle Art of Not Getting a F*ck", "Books", 14.99, 90), ("To Kill a Mockingbird", "Books", 8.99, 105), 
("Play-Doh Modeling Compound 10-Pack", "Toys", 7.99, 130), ("Cards Against Humanity", "Games", 25.00, 100), 
("Jenga Classic Game", "Games", 10.26, 50), ("Crayola Crayons", "Games", 5.50, 100), 
("Bicycle Poker Playing Cards", "Games", 4.85, 50), ("Exploding Kittens Card Game", "Games", 2.50, 100), 
("Yahtzee Game", "Games", 7.99, 60);