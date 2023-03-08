import { executeQuery, runQuery } from "../utils/queryUtils.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const accountExists = (username) => {
  const account = executeQuery(
    "auth",
    "SELECT * FROM `accounts` WHERE `username` = ?",
    [username]
  );
  return account != null;
};

const isValidAccount = async (username, password) => {
  const account = executeQuery(
    "auth",
    "SELECT * FROM `accounts` WHERE `username` = ?",
    [username]
  );
  return bcrypt.compare(password, account.password);
};

const createNewAccount = async ({ email, password, username }) => {
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const { lastInsertRowid } = runQuery(
    "auth",
    "INSERT INTO `accounts` (`username`, `password`, `email`) VALUES (?, ?, ?)",
    [username, encryptedPassword, email]
  );
  const account = executeQuery(
    "auth",
    "SELECT * FROM `accounts` WHERE `id` = ?",
    [lastInsertRowid]
  );
  console.log("New account created:", account);
  return account;
};

export { accountExists, createNewAccount, isValidAccount };
