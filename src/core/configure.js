const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const logger = require('morgan');
const path = require('path');

const config = require('../config');

module.exports = (app) => {
  app.use(logger(config.APP.LOG_LEVEL));

  app.set('trust proxy', 1);

  app.use(compression());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, '../public')));
};
