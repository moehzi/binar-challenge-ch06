const { User, Biodata, Game, sequelize, UserGame } = require("../models/");
const { success, fail } = require("../middlewares/resBuilder");

const createUser = async (req, res) => {
  const { playTime, nickname } = req.body;

  const user = await User.create({ playTime, nickname });

  res.status(201).json(success(user));
};

const createBiodata = async (req, res) => {
  const { name, address, email } = req.body;

  const biodata = await Biodata.create({ name, address, email });

  res.status(201).json(success(biodata));
};

const createGame = async (req, res) => {
  const { playerSelect, comSelect } = req.body;
  // Input with "rock","scissors" or "paper"
  const winner = checkWinner(playerSelect, comSelect);

  const game = await Game.create({
    playerSelect,
    comSelect,
    winner: winner,
    playedAt: sequelize.literal("CURRENT_TIMESTAMP"),
  });

  res.status(201).json(success(game));
};

const createuserGame = async (req, res) => {
  const { userId, gameId } = req.body;

  const userGame = await UserGame.create({
    userId,
    gameId,
  });

  res.status(201).json(success(userGame));
};

const getUser = async (req, res) => {
  const usersWithData = await User.findAll({
    include: [
      {
        model: Biodata,
        as: "Biodata",
      },
    ],
  });

  res.status(201).json(success(usersWithData));
};

const getBiodata = async (req, res) => {
  const biodata = await Biodata.findAll();

  res.status(200).json(success(biodata));
};

const getGame = async (req, res) => {
  const game = await Game.findAll();

  res.status(200).json(success(game));
};
// Many to Many
const getUserGames = async (req, res) => {
  const userGames = await UserGame.findAll({
    attributes: ["id"],
    include: [
      {
        model: User,
        attributes: ["nickname"],
      },
      {
        model: Game,
        attributes: ["winner"],
      },
    ],
  });

  res.status(200).json(success(userGames));
};

const getUserById = async (req, res) => {
  const user = await getPk(User, req, res);

  res.status(200).json(success(user));
};

const getBiodataById = async (req, res) => {
  const biodata = await getPk(Biodata, req, res);

  res.status(200).json(success(biodata));
};
const getGamebyId = async (req, res) => {
  const game = await getPk(Game, req, res);

  res.status(200).json(success(game));
};

const updateUser = async (req, res) => {
  const user = await await getPk(User, req, res);

  const updatedUser = await user.update({
    playTime: req.body.playTime,
    biodataId: req.body.biodataId,
    nickname: req.body.nickname,
  });

  res.status(200).json(success(updatedUser));
};

const updateBiodata = async (req, res) => {
  const biodata = await getPk(Biodata, req, res);

  const updatedBiodata = await biodata.update({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  });

  res.status(200).json(success(updatedBiodata));
};

const updateGame = async (req, res) => {
  const game = await getPk(Game, req, res);

  const { playerSelect, comSelect } = req.body;
  // Input with "rock","scissors" or "paper"
  const winner = checkWinner(playerSelect, comSelect);

  const updatedGame = await game.update({
    playerSelect,
    comSelect,
    winner: winner,
    playedAt: sequelize.literal("CURRENT_TIMESTAMP"),
  });

  res.status(200).json(success(updatedGame));
};

const deleteUser = async (req, res) => {
  await deleteData(User, req, res);
};

const deleteBiodata = async (req, res) => {
  await deleteData(Biodata, req, res);
};

const deleteGame = async (req, res) => {
  await deleteData(Game, req, res);
};

const deleteData = async (tabel, req, res) => {
  const getId = await getPk(tabel, req, res);

  await getId.destroy();

  res.status(200).json(success({ deleted: req.params.id }));
};

const getPk = async (tabel, req, res) => {
  const getId = await tabel.findByPk(Number(req.params.id));

  if (!getId) res.status(404).json(fail("Not found"));

  return getId;
};

function checkWinner(player, com) {
  if (player === "rock" && com === "paper") {
    return "com";
  } else if (player === "rock" && com === "scissors") {
    return "player";
  } else if (player === "paper" && com === "rock") {
    return "player";
  } else if (player === "paper" && com === "scissors") {
    return "com";
  } else if (player === "scissors" && com === "rock") {
    return "com";
  } else if (player === "scissors" && com === "paper") {
    return "player";
  } else if (player === com) {
    return "draw";
  }
}

module.exports = {
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
  createGame,
  updateGame,
  getGamebyId,
  deleteGame,
  getGame,
  getUserGames,
  createuserGame,
  checkWinner,
};
