DROP TABLE IF EXISTS question, answer;

CREATE TABLE question(
   id INT NOT NULL PRIMARY KEY,
   body TEXT,
   date_written DATE,
   asker_name TEXT,
   asker_email TEXT,
   helpful INT,
   reported boolean,
   product_id INT
);

CREATE TABLE answer(
   id INT PRIMARY KEY NOT NULL,
   question_id INT REFERENCES Question(id) ON DELETE CASCADE,
   body TEXT,
   date_written DATE,
   asker_name TEXT,
   asker_email TEXT,
   helpful INT,
   reported boolean,
   photos TEXT []
);

