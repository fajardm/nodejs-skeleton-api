const path = require('path');
const Sequelize = require('sequelize');

const db = require(path.resolve('src', 'core/database'));

const OauthClient = db.define('oauth_client', {
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

module.exports = OauthClient;