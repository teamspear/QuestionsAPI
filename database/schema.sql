CREATE DATABASE q_and_a;

\c q_and_a;

CREATE TABLE question(
   id INT NOT NULL PRIMARY KEY,
   product_id INT,
   body TEXT,
   date_written DATE,
   asker_name TEXT,
   asker_email TEXT,
   helpful INT,
   reported boolean
);

CREATE TABLE answer(
   id INT PRIMARY KEY NOT NULL,
   question_id INT REFERENCES Question(id) ON DELETE CASCADE,
   body TEXT,
   date_written DATE,
   answerer_name TEXT,
   answerer_email TEXT,
   helpful INT,
   reported boolean,
   photos TEXT []
);

\copy question FROM '/usr/csvs/questions_wrangled.csv' DELIMITER ',' CSV HEADER;
\copy answer FROM '/usr/csvs/answers_wrangled.csv' DELIMITER ',' CSV HEADER;