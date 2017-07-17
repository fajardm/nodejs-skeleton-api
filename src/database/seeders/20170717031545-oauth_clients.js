/* eslint-disable no-unused-vars */
const oauthClients = require('../factories/clients');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('oauth_clients', oauthClients, {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('oauth_clients', null, {});
  },
};
