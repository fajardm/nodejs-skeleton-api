const path = require('path');

const validate = require(path.resolve('src', 'core/validate.js'));

const constraints = require('./constraints');

exports.token = (req, res, next) => validate.sync(req, res, next, constraints.token);
