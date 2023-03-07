import ejs from "ejs";
import express from "express";
import session from "express-session";
import path from "path";
import url from "url";

import { executeQuery } from "./query-utils.js";

const PORT = 3000;

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../../static")));

app.engine("html", ejs.renderFile);

app.get("/", function (request, response) {
  if (!request.session.loggedin) {
    response.redirect("/login");
  } else {
    response.redirect("/home");
  }
});

app.post("/auth", function (request, response) {
  (async () => {
    console.log(request.body);
    const { username, password } = request.body;
    if (username && password) {
      const query =
        "SELECT * FROM accounts WHERE username = ? AND password = ?";
      const row = await executeQuery("auth", query, [username, password]);
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
  })();
});

app.get("/home", function (request, response) {
  console.log("User is logged in?", request.session.loggedin);
  if (request.session.loggedin) {
    response.render(path.join(__dirname, "../pages/home.html"), {
      username: request.session.username,
    });
  } else {
    response.send('Please <a href="/">log in</a> to view this page!');
    response.end();
  }
});

app.get("/login", function (request, response) {
  response.sendFile(path.join(__dirname, "../pages/login.html"), (err) => {
    if (err) {
      return response.status(err.status).end();
    } else {
      return response.status(200).end();
    }
  });
});

app.get("/logout", (request, response) => {
  if (request.session.loggedin) {
    request.session.destroy((err) => {
      if (err) {
        response.status(400).send("Unable to log out");
      } else {
        response.send('Logout successful. <a href="/">Log back in</a>');
      }
    });
  } else {
    response.send('<a href="/">Log in</a>');
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
