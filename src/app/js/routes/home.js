import express from "express";
import path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const homeRouter = express.Router();

homeRouter.get("/", (request, response) => {
  if (request.session.loggedin) {
    response.render(path.join(__dirname, "../../pages/home.html"), {
      username: request.session.username,
    });
  } else {
    response.send('Please <a href="/">log in</a> to view this page!');
    response.end();
  }
});

export default homeRouter;
