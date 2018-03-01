const Sequelize = require('sequelize');

const { sequelize } = require('../../helpers');


const OauthToken = sequelize.define('oauth_token', {
  id: {
    primaryKey: true,
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  access_token: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING,
  },
  access_token_expired_at: {
    allowNull: false,
    type: Sequelize.DataTypes.DATE,
  },
  refresh_token: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING,
  },
  refresh_token_expired_at: {
    allowNull: false,
    type: Sequelize.DataTypes.DATE,
  },
  client_id: {
    allowNull: false,
    type: Sequelize.DataTypes.UUID,
  },
  user_id: {
    allowNull: false,
    type: Sequelize.DataTypes.UUID,
  },
}, {
  underscored: true,
});

OauthToken.associate = function fn(models) {
  OauthToken.models = models;

  OauthToken.belongsTo(models.OauthClient, { foreignKey: 'client_id', targetKey: 'id' });

  OauthToken.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });
};

module.exports = OauthToken;
