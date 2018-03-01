/* eslint-disable no-underscore-dangle */
const models = require('../models');

const queries = {};
const oauthToken = {};

oauthToken.create = data => models.OauthToken.create(data);

/**
 * Find a oauth token based on query
 *
 * @param {Object} query
 *
 * @return {{get: function(), attributes: (function(*))|*}}
 */
oauthToken.find = (query) => {
  queries.where = query;

  return {
    attributes: oauthToken.attributes,
    destroy: oauthToken.destroy,
    get: oauthToken.get,
    include: oauthToken.include,
  };
};

/**
 * Select attributes
 *
 * @param attributes
 *
 * @returns {{get: function(): ((function())|*)}}
 */
oauthToken.attributes = (attributes) => {
  queries.attributes = attributes;

  return {
    get: oauthToken.get,
  };
};

/**
 * Include relations
 *
 * @param {Object} relations
 *
 * @returns {{get: function(): ((function())|*)}}
 */
oauthToken.include = (relations) => {
  queries.include = relations;

  return {
    get: oauthToken.get,
  };
};

oauthToken.destroy = () => models.OauthToken.destroy(queries);

/**
 * Get oauth token
 */
oauthToken.get = () => models.OauthToken.find(queries);

exports.create = oauthToken.create;
exports.destroy = oauthToken.destroy;
exports.find = oauthToken.find;
exports.OauthClient = models.OauthClient;
exports.User = models.User;
