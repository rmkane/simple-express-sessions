import fs from "fs";
import sqlite3 from "sqlite3";

const SQL_DEBUG = true;

const loadSql = (filename, delimiter = ";") =>
  fs
    .readFileSync(filename)
    .toString()
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace(/\s+/g, " ")
    .split(delimiter)
    .map((statement) => statement.trim())
    .filter((statement) => statement.length);

const executeSerializedQueries = async (databaseName, callback) => {
  let db;
  try {
    db = new sqlite3.Database(`./${databaseName}.db`, (err) => {
      if (err) console.error(err.message);
      console.log(`Connected to the '${databaseName}' database.`);
    });
    db.serialize(() => {
      callback(db);
    });
  } catch (e) {
    throw Error(e);
  } finally {
    if (db) {
      db.close((err) => {
        if (err) console.error(err.message);
        console.log(`Close the '${databaseName}' database connection.`);
      });
    }
  }
};

const createDatabaseFromSql = async (databaseName, sqlFilename, clean) =>
  new Promise((resolve, reject) => {
    if (clean) {
      fs.rmSync(`./${databaseName}.db`, { force: true }); // Remove existing
    }
    try {
      executeSerializedQueries(databaseName, (db) => {
        loadSql(sqlFilename).forEach((statement) => {
          if (SQL_DEBUG) {
            console.log("Executing:", statement);
          }
          db.run(statement);
        });
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });

const executeQuery = async (databaseName, query, params = []) =>
  new Promise((resolve, reject) => {
    try {
      executeSerializedQueries(databaseName, (db) => {
        db.get(query, params, (error, row) => {
          if (error) reject(error);
          else resolve(row);
        });
      });
    } catch (e) {
      reject(e);
    }
  });

const executeQueryAll = async (databaseName, query, params = []) =>
  new Promise((resolve, reject) => {
    try {
      executeSerializedQueries(databaseName, (db) => {
        db.all(query, params, (error, rows) => {
          if (error) reject(error);
          else resolve(rows);
        });
      });
    } catch (e) {
      reject(e);
    }
  });

export {
  createDatabaseFromSql,
  executeSerializedQueries,
  executeQuery,
  executeQueryAll,
  loadSql,
};
