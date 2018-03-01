const app = require('express')();

const oauths = require('./oauths');

app.use('/oauth', oauths);

module.exports = app;
