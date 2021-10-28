const admin = [
  {
    username: "moehzi",
    password: "moehzi123",
  },
];

const ACCESS_TOKEN = "rahasia";

const generateAuthToken = () => {
  return ACCESS_TOKEN;
};

const authTokens = {};

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

function requireAuth(req, res, next) {
  const authToken = req.cookies["AuthToken"];

  // Inject the user to the request
  req.user = authTokens[authToken];
  if (req.user) {
    next();
  } else {
    res.render("login", {
      message: "Please login to continue",
      messageClass: "alert-danger",
      layout: false,
    });
  }
}

module.exports = {
  checkCredentials,
  requireAuth,
};
