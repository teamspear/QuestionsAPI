const { Pool } = require('pg');

const {
  dbUSERNAME, dbPASSWORD, dbHOST, dbPORT, dbDATABASE,
} = require('../keys');

const pool = new Pool({
  host: dbHOST,
  port: dbPORT,
  database: dbDATABASE,
  user: dbUSERNAME,
  password: dbPASSWORD,
});

module.exports = pool;
