import express from "express";
import { executeQuery, runQuery } from "../utils/queryUtils.js";

const authRouter = express.Router();

const accountExists = (username, password) => {
  const row = executeQuery(
    "auth",
    "SELECT * FROM `accounts` WHERE `username` = ?",
    [username]
  );
  return row != null;
};

const isValidAccount = (username, password) => {
  const row = executeQuery(
    "auth",
    "SELECT * FROM `accounts` WHERE `username` = ? AND `password` = ?",
    [username, password]
  );
  return row != null;
};

const createNewAccount = ({ email, password, username }) => {
  const { lastInsertRowid } = runQuery(
    "auth",
    "INSERT INTO `accounts` (`username`, `password`, `email`) VALUES (?, ?, ?)",
    [username, password, email]
  );
  const account = executeQuery(
    "auth",
    "SELECT * FROM `accounts` WHERE `id` = ?",
    [lastInsertRowid]
  );
  console.log("New user created:", account);
};

authRouter.post("/login", function (request, response) {
  console.log(request.body);
  const { password, username } = request.body;
  if (username && password) {
    if (isValidAccount(username, password)) {
      request.session.loggedin = true;
      request.session.username = username;
      response.redirect("/home");
    } else {
      response.send("Incorrect username and/or password!");
    }
    response.end();
  } else {
    response.send("Please enter a username and/or password!");
    response.end();
  }
});

authRouter.post("/signup", function (request, response) {
  console.log(request.body);
  const { email, password, username } = request.body;
  if (email && username && password) {
    if (!accountExists(username)) {
      createNewAccount({ email, password, username });
      request.session.loggedin = true;
      request.session.username = username;
      response.redirect("/home");
    } else {
      response.send("Account already exists!");
    }
    response.end();
  } else {
    response.send("Please enter a username, email and/or password!");
    response.end();
  }
});

export default authRouter;
