const path = require('path');

const validate = require(path.resolve('src', 'core/validate.js'));

const constraints = require('./constraints');

module.exports = {
  register: (req, res, next) => validate.async(req, res, next, constraints.register),
};
