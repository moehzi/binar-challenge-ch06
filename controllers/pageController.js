const db = require("../models");
const { User, Biodata, Game, UserGame } = require("../models");
const { checkWinner } = require("./apiControllers");
const indexPage = (req, res) => {
  res.redirect("/login"),
    {
      message: false,
      layout: false,
    };
};

const loginPage = (req, res) => {
  res.render("login", {
    title: "Login",
    message: false,
    layout: false,
  });
};

const logout = (req, res) => {
  res.clearCookie("AuthToken");
  res.redirect("/login");
};
const loginUser = (req, res) => {
  res.redirect("/dashboard");
};

const dashboardPage = async (req, res) => {
  res.render("dashboard", {
    layout: "layouts/main-layout",
    title: "Dashboard",
    page_name: "dashboard",
    countGame: await countData('SELECT COUNT(*) FROM "UserGames"'),
    countUser: await countData('SELECT COUNT(*) FROM "Users"'),
  });
};

const getUsersId = async (req, res) => {
  const user = await User.findByPk(Number(req.params.id));

  const biodata = await Biodata.findByPk(Number(req.params.id));

  res.render("edit", {
    layout: "layouts/main-layout",
    title: "Edit",
    page_name: "users",
    id: user.id,
    playTime: user.playTime,
    nickname: user.nickname,
    name: biodata.name,
    email: biodata.email,
    address: biodata.address,
  });
};

const createUserPage = async (req, res) => {
  const { nickname, name, address, email, playTime } = req.body;
  await User.create(
    {
      playTime,
      nickname,
      Biodata: {
        name,
        email,
        address,
      },
    },
    {
      include: [
        {
          model: Biodata,
          as: "Biodata",
        },
      ],
    }
  );

  res.redirect("/users");
};

const usersPage = async (req, res) => {
  const usersWithData = await User.findAll({
    include: [
      {
        model: Biodata,
        as: "Biodata",
      },
    ],
  });

  res.render("user", {
    title: "Users",
    layout: "layouts/main-layout",
    page_name: "users",
    usersWithData,
  });
};

const gamesPage = async (req, res) => {
  const userGames = await UserGame.findAll({
    attributes: ["id"],
    include: [
      {
        model: User,
        attributes: ["nickname"],
      },
      {
        model: Game,
        attributes: ["winner", "comSelect", "playerSelect", "playedAt"],
      },
    ],
  });
  res.render("games", {
    title: "Games",
    layout: "layouts/main-layout",
    page_name: "games",
    userGames,
  });
};

const editUserPage = async (req, res) => {
  const user = await User.findByPk(Number(req.params.id));
  const biodata = await Biodata.findByPk(Number(req.params.id));

  if (!user && !biodata) return res.send("Not Found");

  await user.update(
    {
      playTime: req.body.playTime,
      nickname: req.body.nickname,
    },

    await biodata.update({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    })
  );

  res.redirect("/users");
};

const deleteUserPage = async (req, res) => {
  const user = await User.findByPk(Number(req.params.id));

  if (!user) return res.send("Not Found");

  await user.destroy();

  res.redirect("/users");
};

const countData = async (query) => {
  let count = await db.sequelize.query(query, {
    raw: true,
  });

  let countData = count[0][0].count;

  return countData;
};
module.exports = {
  loginPage,
  loginUser,
  dashboardPage,
  usersPage,
  createUserPage,
  getUsersId,
  editUserPage,
  deleteUserPage,
  indexPage,
  logout,
  gamesPage,
};
