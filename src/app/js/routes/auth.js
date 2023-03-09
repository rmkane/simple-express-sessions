import express from "express";
import {
  accountExists,
  createNewAccount,
  isValidAccount,
} from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/log-in", async function (request, response) {
  const { password, username } = request.body;
  if (username && password) {
    const isValid = await isValidAccount(username, password);
    if (isValid) {
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

authRouter.post("/sign-up", async function (request, response) {
  const { email, password, username } = request.body;
  if (email && username && password) {
    if (!accountExists(username)) {
      const account = await createNewAccount({ email, password, username });
      request.session.loggedin = true;
      request.session.username = account.username;
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
