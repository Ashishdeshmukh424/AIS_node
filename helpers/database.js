/* eslint-disable no-console */
const mysql = require("mysql");
const util = require("util");
import { config } from "../config";

const con = mysql.createPool({
  host: config.databaseHost,
  port: config.databasePort,
  database: config.databaseName,
  user: config.databaseUser,
  password: config.databasePassword,
  connectionLimit: 100,
  timezone: "UTC"
});

con.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  console.log("Successfully connected to Database !!");

  if (connection) {
    connection.release();
  }
});

con.getConnection(err => {
  if (err) {
    console.log(err);
    console.log("Error in connecting to Database");
    return;
  }
  console.log("Connection established");
});

export const mysqlConnection = util.promisify(con.query).bind(con);
