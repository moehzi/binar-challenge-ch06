"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: "UserGames",
        foreignKey: "gameId",
      });
    }
  }
  Game.init(
    {
      playerSelect: DataTypes.STRING,
      comSelect: DataTypes.STRING,
      winner: DataTypes.STRING,
      playedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
