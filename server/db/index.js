const pgp = require("pg-promise")();

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5432;
const database = "questions";

const connection = `postgres://${host}:${port}/${database}`;

const db = pgp(connection);

module.exports = db;
