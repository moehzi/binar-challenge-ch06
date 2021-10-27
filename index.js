const { Router, request } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const admin = [
  {
    username: "moehzi",
    password: "moehzi123",
  },
];

const ACCESS_TOKEN = "rahasia";

app.use(express.json());
app.use("/assets", express.static("public"));

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const generateAuthToken = () => {
  return ACCESS_TOKEN;
};
const authTokens = {};

app.get("/login", (req, res) => {
  res.render("login", {
    message: false,
    layout: false,
  });
});

app.post("/login", checkCredentials, (req, res) => {
  res.redirect("/dashboard");
});

app.use((req, res, next) => {
  const authToken = req.cookies["AuthToken"];

  req.user = authTokens[authToken];

  next();
});

const requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render("login", {
      message: "Please login to continue",
      messageClass: "alert-danger",
      layout: false,
    });
  }
};

app.get("/dashboard", requireAuth, (req, res) => {
  const url = req.url;
  res.render("dashboard", {
    layout: "layouts/main-layout",
    title: "Dashboard",
    page_name: "dashboard",
  });
});

app.get("/users", requireAuth, (req, res) => {
  res.render("user", {
    layout: "layouts/main-layout",
    page_name: "users",
  });
});

app.listen(PORT, () => console.log(`app listening on port localhost:${PORT}`));

function checkCredentials(req, res, next) {
  const { username, password } = req.body;
  const user = admin.find((u) => {
    return u.username === username && password === u.password;
  });
  if (!user) {
    res.render("login", {
      message: "Invalid username or password",
      messageClass: "alert-danger",
      layout: false,
    });
  } else {
    const authToken = generateAuthToken();

    authTokens[authToken] = user;

    res.cookie("AuthToken", authToken);
    next();
  }
}
