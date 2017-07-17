/* eslint-disable no-unused-vars */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('oauth_clients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      secret_key: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      grants: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('oauth_clients');
  },
};
