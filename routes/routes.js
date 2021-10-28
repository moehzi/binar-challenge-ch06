const express = require("express");
const { requireAuth, checkCredentials } = require("../middlewares/auth");
const router = express.Router();
const {
  loginPage,
  dashboardPage,
  loginUser,
  usersPage,
} = require("../controllers/pageController");

router.get("/login", loginPage);

router.post("/login", checkCredentials, loginUser);

router.get("/dashboard", requireAuth, dashboardPage);

router.get("/users", requireAuth, usersPage);

module.exports = router;
