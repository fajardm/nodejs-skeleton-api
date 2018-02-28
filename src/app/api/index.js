const app = require('express')();

const oauths = require('./oauths');
const users = require('./users');

app.use('/oauths', oauths);
app.use('/users', users);

module.exports = app;