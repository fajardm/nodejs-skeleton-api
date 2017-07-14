/* eslint-disable no-console */
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const jsend = require('jsend');
const logger = require('morgan');
const path = require('path');

const appConfig = require('./config/app');

const app = express();

app.use(jsend.middleware);
app.use(logger(appConfig.logLevel));
app.set('trust proxy', 1);
const whiteListed = process.env.ALLOWED_ORIGINS || '';
app.use(cors({
  origin: (origin, cb) => {
    const isWhiteListed = whiteListed.split(',').indexOf(origin) > -1;

    cb(null, isWhiteListed);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.jsend.success({
    name: `${appConfig.name} REST API`,
  });
});

app.use('/v1', require('./api/v1'));

// catch 404
app.use((req, res) => {
  res.status(404).jsend.fail('Endpoint not found');
});

// @todo Add error handling to third party or display to console log
// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // only providing error in development
  const tempError = err;
  tempError.message = appConfig.env === 'development' ? err.message : 'Internal Server Error';

  res.status(500).jsend.error(tempError);
});

module.exports = app;
