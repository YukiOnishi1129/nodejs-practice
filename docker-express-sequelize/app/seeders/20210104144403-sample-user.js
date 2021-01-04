"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", [
      {
        user_name: "Jiro",
        age: 31,
        created_at: "2021-01-01",
        updated_at: "2021-01-01",
      },
      {
        user_name: "Taro",
        age: 4,
        created_at: "2021-01-01",
        updated_at: "2021-01-01",
      },
      {
        user_name: "hanako",
        age: 19,
        created_at: "2021-01-01",
        updated_at: "2021-01-01",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
