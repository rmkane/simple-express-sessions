import express from "express";
import path from "path";
import url from "url";
import { executeQuery } from "../utils/queryUtils.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const authRouter = express.Router();

authRouter.post("/", function (request, response) {
  console.log(request.body);
  const { username, password } = request.body;
  if (username && password) {
    const row = executeQuery(
      "auth",
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password]
    );
    if (row) {
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

export default authRouter;
