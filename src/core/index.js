/* eslint-disable no-console */
const express = require('express');

const configures = require('./configure');
const errors = require('./error');

const app = express();

configures(app);

app.get('/ping', (req, res) => {
  res.send('Pong');
});

errors(app);

module.exports = app;