/* eslint-disable no-unused-vars */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('oauth_tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      access_token: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      access_token_expired_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      refresh_token: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      refresh_token_expired_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      client_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('oauth_tokens');
  },
};
