/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');

const models = require('../models');

const queries = {};
const user = {};

user.create = data => models.User.create(data);

/**
 * Find a user based on query
 *
 * @param {Object} query
 *
 * @return {{get: function(), attributes: (function(*))|*}}
 */
user.find = (query) => {
  queries.where = query;

  return {
    attributes: user.attributes,
    get: user.get,
    include: user.include,
  };
};

/**
 * Select attributes
 *
 * @param attributes
 *
 * @returns {{get: function(): ((function())|*)}}
 */
user.attributes = (attributes) => {
  queries.attributes = attributes;

  return {
    get: user.get,
  };
};

/**
 * Include relations
 *
 * @param {Object} relations
 *
 * @returns {{get: function(): ((function())|*)}}
 */
user.include = (relations) => {
  queries.include = relations;

  return {
    get: user.get,
  };
};

user.findByEmailOrUsername = (email, username) => {
  queries.where = {
    $or: [{ email }, { username }],
  };

  return {
    attributes: user.attributes,
    get: user.get,
    include: user.include,
  };
};

user.comparePassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

/**
 * Get user
 */
user.get = () => models.User.find(queries);

exports.create = user.create;
exports.comparePassword = user.comparePassword;
exports.find = user.find;
exports.findByEmailOrUsername = user.findByEmailOrUsername;
