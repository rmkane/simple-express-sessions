import express from "express";
import path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const logoutRouter = express.Router();

logoutRouter.get("/", (request, response) => {
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

export default logoutRouter;
