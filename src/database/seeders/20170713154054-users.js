/* eslint-disable no-unused-vars */
const users = require('../factories/users');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', users, {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
