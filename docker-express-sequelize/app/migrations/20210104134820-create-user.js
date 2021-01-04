"use strict";
module.exports = {
  /**
   * 作成処理
   * @param {*} queryInterface
   * @param {*} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_name: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  /**
   * 削除処理
   * @param {*} queryInterface
   * @param {*} Sequelize
   */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
