const pgp = require('pg-promise')();
const {
  dbUSERNAME,
  dbPASSWORD,
  dbHOST,
  dbPORT,
  dbDATABASE,
} = require('../keys');

const connection = {
  host: dbHOST,
  port: dbPORT,
  database: dbDATABASE,
  user: dbUSERNAME,
  password: dbPASSWORD,
};

const db = pgp(connection);

module.exports = db;
