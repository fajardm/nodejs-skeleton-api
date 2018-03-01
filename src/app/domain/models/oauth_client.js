const Sequelize = require('sequelize');

const { sequelize } = require('../../helpers');

const OauthClient = sequelize.define('oauth_client', {
  id: {
    primaryKey: true,
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  secret_key: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING,
  },
  grants: {
    allowNull: false,
    type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
  },
}, {
  paranoid: true,
  underscored: true,
});

// eslint-disable-next-line no-unused-vars
OauthClient.associate = function fn(models) {
};

module.exports = OauthClient;
