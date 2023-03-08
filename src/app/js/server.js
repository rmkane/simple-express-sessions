import ejs from "ejs";
import express from "express";
import session from "express-session";
import path from "path";
import url from "url";

import {
  authRouter,
  homeRouter,
  loginRouter,
  logoutRouter,
  signupRouter,
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
    response.redirect("/login");
  } else {
    response.redirect("/home");
  }
});

app.use("/auth", authRouter);
app.use("/home", homeRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
