"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Game, {
        foreignKey: "gameId",
      });
    }
  }
  UserGame.init(
    {
      userId: DataTypes.INTEGER,
      gameId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserGame",
      tableName: "UserGames",
    }
  );
  return UserGame;
};
