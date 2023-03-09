import express from "express";
import path from "path";
import url from "url";
import { fetchAccount } from "../controllers/auth.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const accountRouter = express.Router();

accountRouter.get("/", async (request, response) => {
  if (request.session.loggedin) {
    const account = fetchAccount(request.session.username);
    response.render(path.join(__dirname, "../../pages/account.html"), {
      account: {
        username: account.username,
        email: account.email,
      },
    });
  } else {
    response.redirect("/log-in");
  }
});

export default accountRouter;
