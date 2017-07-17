const app = require('express')();

const middlewares = require('./middlewares');

app.post('/token', middlewares.oauth.token());

app.post('/authorise', middlewares.oauth.authenticate(), (req, res) => {
  res.send('Secret area');
});

module.exports = app;
