/* eslint-disable no-underscore-dangle */
const models = require('../models');

const queries = {};
const oauthClient = {};

oauthClient.create = data => models.OauthClient.create(data);

/**
 * Find a oauth client based on query
 *
 * @param {Object} query
 *
 * @return {{get: function(), attributes: (function(*))|*}}
 */
oauthClient.find = (query) => {
  queries.where = query;

  return {
    attributes: oauthClient.attributes,
    get: oauthClient.get,
    include: oauthClient.include,
  };
};

/**
 * Select attributes
 *
 * @param attributes
 *
 * @returns {{get: function(): ((function())|*)}}
 */
oauthClient.attributes = (attributes) => {
  queries.attributes = attributes;

  return {
    get: oauthClient.get,
  };
};

/**
 * Include relations
 *
 * @param {Object} relations
 *
 * @returns {{get: function(): ((function())|*)}}
 */
oauthClient.include = (relations) => {
  queries.include = relations;

  return {
    get: oauthClient.get,
  };
};

/**
 * Get oauth client
 */
oauthClient.get = () => models.OauthClient.find(queries);

exports.find = oauthClient.find;
