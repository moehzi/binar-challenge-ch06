const express = require("express");
const { requireAuth, checkCredentials } = require("../middlewares/auth");
const router = express.Router();

const {
  loginPage,
  dashboardPage,
  loginUser,
  usersPage,
  createUserPage,
  getUsersId,
  editUserPage,
  deleteUserPage,
  indexPage,
  logout,
  gamesPage,
} = require("../controllers/pageController");

const {
  createUser,
  createBiodata,
  getBiodata,
  getUser,
  updateUser,
  updateBiodata,
  deleteUser,
  deleteBiodata,
  getBiodataById,
  getUserById,
  getGame,
  getGamebyId,
  createGame,
  updateGame,
  deleteGame,
  getUserGames,
  createuserGame,
} = require("../controllers/apiControllers");

// Page
router.get("/", indexPage);
router.get("/login", loginPage);
router.get("/logout", logout);
router.post("/login", checkCredentials, loginUser);
router.get("/dashboard", requireAuth, dashboardPage);
router.get("/users", requireAuth, usersPage);
router.get("/games", requireAuth, gamesPage);
router.get("/users/:id/edit", requireAuth, getUsersId);
router.get("/users/:id/delete", requireAuth, deleteUserPage);
router.post("/users/new", requireAuth, createUserPage);
router.post("/users/:id/edit", requireAuth, editUserPage);

// API
router.get("/api/v1/users", getUser);
router.get("/api/v1/biodatas", getBiodata);
router.get("/api/v1/games", getGame);
router.get("/api/v1/users/:id", getUserById);
router.get("/api/v1/games/:id", getGamebyId);
router.get("/api/v1/biodatas/:id", getBiodataById);
router.get("/api/v1/user-games", getUserGames);
router.post("/api/v1/users", createUser);
router.post("/api/v1/user-games", createuserGame);
router.post("/api/v1/games", createGame);
router.post("/api/v1/biodatas", createBiodata);
router.put("/api/v1/users/:id", updateUser);
router.put("/api/v1/games/:id", updateGame);
router.put("/api/v1/biodatas/:id", updateBiodata);
router.delete("/api/v1/users/:id", deleteUser);
router.delete("/api/v1/games/:id", deleteGame);
router.delete("/api/v1/biodatas/:id", deleteBiodata);

// Check Error 500
router.get("/error", (req, res) => {
  throw new Error("Something went wrong");
});
module.exports = router;
