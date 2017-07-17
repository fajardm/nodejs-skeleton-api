const app = require('express')();

const middlewares = require('./middlewares');
const validations = require('./validations');

app.post('/token', validations.token, middlewares.oauth.token());

app.post('/authorise', middlewares.oauth.authenticate(), (req, res) => {
  res.send('Secret area');
});

module.exports = app;
