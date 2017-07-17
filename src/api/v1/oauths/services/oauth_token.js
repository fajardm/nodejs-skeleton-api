const path = require('path');
const Sequelize = require('sequelize');

const db = require(path.resolve('src', 'core/database'));
const userServices = require(path.resolve('src', 'api/v1/users/services'));

const oauthClient = require('./oauth_client');

const OauthToken = db.define('oauth_token', {
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

// associations
OauthToken.belongsTo(oauthClient, { foreignKey: 'client_id', targetKey: 'id' });
OauthToken.belongsTo(userServices.user, { foreignKey: 'user_id', targetKey: 'id' });

module.exports = OauthToken;