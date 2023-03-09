import ejs from "ejs";
import express from "express";
import session from "express-session";
import path from "path";
import url from "url";

import {
  accountRouter,
  authRouter,
  forgotPasswordRouter,
  homeRouter,
  logInRouter,
  logOutRouter,
  resetPasswordRouter,
  signUpRouter,
} from "./routes/index.js";

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
    response.redirect("/log-in");
  } else {
    response.redirect("/home");
  }
});

app.use("/auth", authRouter);
app.use("/account", accountRouter);
app.use("/home", homeRouter);
app.use("/log-in", logInRouter);
app.use("/log-out", logOutRouter);
app.use("/sign-up", signUpRouter);
app.use("/forgot-password", forgotPasswordRouter);
app.use("/reset-password", resetPasswordRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
