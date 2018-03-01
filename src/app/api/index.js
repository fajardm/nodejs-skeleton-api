const app = require('express')();

const oauths = require('./oauths');
const users = require('./users');

app.use('/oauth', oauths);
app.use('/users', users);

module.exports = app;
