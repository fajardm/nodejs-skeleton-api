const OauthClient = require('./oauth_client');
const OauthToken = require('./oauth_token');
const User = require('./user');

const models = {
  OauthClient,
  OauthToken,
  User,
};

Object.keys(models).forEach((key) => {
  models[key].associate(models);
});

exports.OauthClient = OauthClient;
exports.OauthToken = OauthToken;
exports.User = User;
