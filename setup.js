import {
  createDatabaseFromSql,
  executeQuery,
} from "./src/app/js/query-utils.js";

console.log("CREATE database");
await createDatabaseFromSql("auth", "./data/setup.sql", false);

console.log("FETCH test account");
const row = await executeQuery(
  "auth",
  "SELECT * FROM `accounts` where `username` = ?",
  ["test"]
);
console.log(row?.id === 2);
