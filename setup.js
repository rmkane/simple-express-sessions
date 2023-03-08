import { createDatabaseFromSql, query } from "./src/app/js/query-utils.js";

console.log("CREATE database");
createDatabaseFromSql("auth", "./data/setup.sql", true);

console.log("FETCH test account");
const result = query("auth", "SELECT * FROM `accounts` where `username` = ?", [
  "test",
]);
console.log(result.id === 2);
