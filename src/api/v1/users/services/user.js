const bcrypt = require('bcrypt');
const path = require('path');
const Sequelize = require('sequelize');

const pathToDatabase = path.resolve('src', 'core/database');

const db = require(pathToDatabase);

const User = db.define('user', {
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

/**
 * Create with ecrypt password
 * @param data
 */
User.createWithEncryptPassword = data => this.create({
  email: data.email,
  username: data.username,
  password: bcrypt.hashSync(data.password || '', 10),
});

/**
 * @param {string} email
 * @param {string} username
 * @return {Promise.<*>}
 */
User.findByEmailOrUsername = function _(email, username) {
  return this.find({
    where: {
      $or: [{ email }, { username }],
    },
  })
};

/**
 * Delete by id
 * @param id
 * @return {Promise.<*>}
 */
User.destroyById = function _(id) {
  return this.destroy({
    where: {
      id,
    },
  });
};

/**
 * @return {boolean}
 */
User.prototype.comparePassword = function _(password) {
  return bcrypt.compareSync(password, this.password);
};

/**
 * Hide some attributes
 * @return {object}
 */
User.prototype.toJSON = function _() {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = User;
