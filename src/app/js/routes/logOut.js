import express from "express";
import path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const logOutRouter = express.Router();

logOutRouter.get("/", (request, response) => {
  if (request.session.loggedin) {
    request.session.destroy((err) => {
      if (err) {
        response.status(400).send("Unable to log out");
      } else {
        response.sendFile(
          path.join(__dirname, "../../pages/logged-out.html"),
          (err) => {
            if (err) {
              return response.status(err.status).end();
            } else {
              return response.status(200).end();
            }
          }
        );
      }
    });
  } else {
    response.redirect("/log-in");
  }
});

export default logOutRouter;
