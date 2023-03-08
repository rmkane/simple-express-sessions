import { createDatabaseFromSql, executeQuery } from "./utils/queryUtils.js";

console.log("CREATE database");
createDatabaseFromSql("auth", "./data/setup.sql", true);

console.log("FETCH test account");
const result = executeQuery(
  "auth",
  "SELECT * FROM `accounts` where `username` = ?",
  ["test"]
);
console.log(result.id === 2);
