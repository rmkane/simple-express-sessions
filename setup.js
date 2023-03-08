import {
  createDatabaseFromSql,
  openDatabase,
} from "./src/app/js/query-utils.js";

console.log("CREATE database");
createDatabaseFromSql("auth", "./data/setup.sql", true);

console.log("FETCH test account");
const db = openDatabase('auth');
const stmt = db.prepare('SELECT * FROM `accounts` where `username` = ?')
const result = stmt.get('test');
console.log(result?.id === 2);
db.close();
