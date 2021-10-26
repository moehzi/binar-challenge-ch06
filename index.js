const { Router, request } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const generateAuthToken = () => {
  return ACCESS_TOKEN;
};
const authTokens = {};

app.get("/login", (req, res) => {
  res.render("login", {
    message: false,
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
    });
  }
};

app.get("/dashboard", requireAuth, (req, res) => {
  res.render("dashboard");
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
    });
  } else {
    const authToken = generateAuthToken();

    authTokens[authToken] = user;

    res.cookie("AuthToken", authToken);
    next();
  }
}
