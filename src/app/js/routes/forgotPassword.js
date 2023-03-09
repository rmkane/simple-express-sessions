import express from "express";
import path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const forgotPasswordRouter = express.Router();

forgotPasswordRouter.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "../../pages/forgot-password.html"), (err) => {
    if (err) {
      return response.status(err.status).end();
    } else {
      return response.status(200).end();
    }
  });
});

export default forgotPasswordRouter;
