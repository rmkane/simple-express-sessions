import express from "express";
import path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const loginRouter = express.Router();

loginRouter.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../../pages/login.html"), (err) => {
    if (err) {
      return response.status(err.status).end();
    } else {
      return response.status(200).end();
    }
  });
});

export default loginRouter;
