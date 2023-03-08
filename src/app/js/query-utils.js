import fs from "fs";
import Database from "better-sqlite3";

const openDatabase = (databaseName) =>
  new Database(`${databaseName}.db`, { verbose: console.log });

const dropDatabase = (databaseName) => {
  fs.rmSync(`./${databaseName}.db`, { force: true });
};

const createDatabaseFromSql = (databaseName, sqlFilename, clean) => {
  if (clean) dropDatabase(databaseName);
  const db = openDatabase(databaseName);
  db.exec(fs.readFileSync(sqlFilename, "utf8"));
  db.close();
};

const query = (databaseName, query, params = []) => {
  let db = null;
  try {
    db = openDatabase(databaseName);
    return db.prepare(query).get(...params);
  } finally {
    if (db) {
      db.close();
    }
  }
};

const queryAll = (databaseName, query, params = []) => {
  let db = null;
  try {
    db = openDatabase(databaseName);
    return db.prepare(query).all(...params);
  } finally {
    if (db) {
      db.close();
    }
  }
};

export { createDatabaseFromSql, openDatabase, query, queryAll };
