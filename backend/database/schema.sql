SET FOREIGN_KEY_CHECKS = 0;


CREATE TABLE role(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  roleName VARCHAR (50)
);

DROP TABLE IF EXISTS client;
CREATE TABLE client(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  firstname VARCHAR(50),
  lastname VARCHAR (50),
  email VARCHAR (100) NOT NULL,
  hashedPassword VARCHAR(255)NOT NULL,
  role_id INT DEFAULT 2,
  CONSTRAINT role_id FOREIGN KEY (role_id) REFERENCES role(id)
);

DROP TABLE IF EXISTS recipe;
CREATE TABLE recipe (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  descriptions VARCHAR(255) NOT NULL,
  global_time VARCHAR(50) NOT NULL,
  number_persons INT NOT NULL,
  image_url VARCHAR(255),
  user_id INT,
  CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES client(id),
  category_id INT,
  CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES category(id)
);

DROP TABLE IF EXISTS ingredient;
CREATE TABLE ingredient (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS recipeIngredient;
CREATE TABLE recipeIngredient (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  quantity INT,
  unit VARCHAR(50),
  ingredient_id INT,
  recipe_id INT,
  CONSTRAINT ingredient_id FOREIGN KEY (ingredient_id) REFERENCES ingredient(id),
  CONSTRAINT recipe_id FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

DROP TABLE IF EXISTS comment;
CREATE TABLE comment (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  comment VARCHAR(255),
  commentUserId INT,
  CommentRecipeId INT,
  CONSTRAINT commentUserId FOREIGN KEY (commentUserId) REFERENCES client(id),
  CONSTRAINT CommentRecipeId FOREIGN KEY (CommentRecipeId) REFERENCES recipe(id)
);

DROP TABLE IF EXISTS favorite;
CREATE TABLE favorite (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  userFid INT,
  recipeFid INT,
  UNIQUE KEY userFidRecipeFid (userFid, recipeFid),
  CONSTRAINT userFid FOREIGN KEY (userFid) REFERENCES client(id),
  CONSTRAINT recipeFid FOREIGN KEY (recipeFid) REFERENCES recipe(id)
);

DROP TABLE IF EXISTS instruction;
CREATE TABLE instruction (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  step TEXT NOT NULL,
  recipeStep_id INT,
  CONSTRAINT recipeStep_id FOREIGN KEY (recipeStep_id) REFERENCES recipe(id)
);


DROP TABLE IF EXISTS category;
CREATE TABLE category (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  image_url VARCHAR(255) NOT NULL
);

SET FOREIGN_KEY_CHECKS = 1;