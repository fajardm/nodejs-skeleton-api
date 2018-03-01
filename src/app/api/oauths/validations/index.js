const { validate } = require('../../../helpers');

const constraints = require('./constraints');

exports.token = (req, res, next) => validate.sync(req, res, next, constraints.token);
