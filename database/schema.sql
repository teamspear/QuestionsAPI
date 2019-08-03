CREATE DATABASE q_and_a;

\c q_and_a;

CREATE TABLE question(
   id SERIAL NOT NULL PRIMARY KEY,
   product_id INT NOT NULL,
   body TEXT NOT NULL,
   date_written DATE DEFAULT NOW(),
   asker_name TEXT NOT NULL,
   asker_email TEXT,
   helpful INT DEFAULT 0,
   reported boolean DEFAULT false
);

CREATE TABLE answer(
   id SERIAL PRIMARY KEY NOT NULL,
   question_id INT REFERENCES Question(id) ON DELETE CASCADE,
   body TEXT NOT NULL,
   date_written DATE DEFAULT NOW(),
   answerer_name TEXT NOT NULL,
   answerer_email TEXT,
   helpful INT DEFAULT 0,
   reported boolean DEFAULT false,
   photos TEXT []
);

\copy question FROM '/usr/csvs/questions_wrangled.csv' DELIMITER ',' CSV HEADER;
\copy answer FROM '/usr/csvs/answers_wrangled.csv' DELIMITER ',' CSV HEADER;

SELECT setval('question_id_seq'::regclass,3521634);
SELECT setval('answer_id_seq'::regclass,12392946);