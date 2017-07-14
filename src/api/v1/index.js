const app = require('express')();

const users = require('./users');

app.use('/users', users);

module.exports = app;