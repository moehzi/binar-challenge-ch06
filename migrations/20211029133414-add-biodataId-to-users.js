"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "biodataId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Biodatas",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "biodataId");
  },
};
