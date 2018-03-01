const app = require('express')();

const middlewares = require('./middlewares/index');
const validations = require('./validations/index');

app.post('/token', validations.token, middlewares.oauth.token());

app.post('/secret', middlewares.oauth.authenticate(), (req, res) => {
  res.send('Secret area');
});

module.exports = app;
