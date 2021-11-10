"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Biodata, {
        foreignKey: "biodataId",
        as: "Biodata",
      });
      this.belongsToMany(models.Game, {
        through: "UserGames",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      biodataId: DataTypes.INTEGER,
      playTime: DataTypes.INTEGER,
      nickname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );
  return User;
};
