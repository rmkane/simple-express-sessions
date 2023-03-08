import fs from "fs";
import Database from 'better-sqlite3'

const openDatabase = (databaseName) => new Database(`${databaseName}.db`, { verbose: console.log });

const dropDatabase = (databaseName) => {
  fs.rmSync(`./${databaseName}.db`, { force: true }); // Remove existing
}

const createDatabaseFromSql = (databaseName, sqlFilename, clean) => {
  if (clean) {
    dropDatabase(databaseName);
  }
  const db = openDatabase(databaseName);
  const sql = fs.readFileSync(sqlFilename, 'utf8');
  db.exec(sql);
  db.close();
};

export {
  createDatabaseFromSql,
  openDatabase,
};
