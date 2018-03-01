const Sequelize = require('sequelize');

const { sequelize } = require('../../helpers');

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
  },
  email: {
    unique: true,
    allowNull: false,
    type: Sequelize.DataTypes.STRING,
  },
  username: {
    unique: true,
    allowNull: false,
    type: Sequelize.DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING,
  },
}, {
  paranoid: true,
  underscored: true,
});

User.hiddenAttributes = ['password'];

// eslint-disable-next-line no-unused-vars
User.associate = function fn(models) {
};

module.exports = User;
