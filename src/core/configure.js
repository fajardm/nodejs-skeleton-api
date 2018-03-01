const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const jsend = require('jsend');
const logger = require('morgan');
const path = require('path');

const config = require('../config');
const helpers = require('../app/helpers');

module.exports = (app) => {
  app.use(logger(config.APP.LOG_LEVEL));

  app.set('trust proxy', 1);

  app.use(compression());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(jsend.middleware);

  app.use(helpers.validateValidator);

  app.use(express.static(path.join(__dirname, '../public')));
};
