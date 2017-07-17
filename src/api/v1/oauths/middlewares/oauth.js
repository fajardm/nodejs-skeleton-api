const path = require('path');

const userServices = require(path.resolve('src', 'api/v1/users/services'));
const config = require(path.resolve('src', 'config'));

const OauthServer = require('../libs/server');
const services = require('../services');

module.exports = new OauthServer({
  model: {
    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#getaccesstoken-accesstoken-callback
     * @param {string} accessToken
     * @param {function} callback
     * @return {Promise.<object|boolean>}
     */
    getAccessToken: (accessToken, callback) => {
      services.oauthToken.find({
        where: {
          access_token: accessToken,
        },
        include: [
          { model: services.oauthClient },
          { model: userServices.user },
        ],
      })
        .then((data) => {
          if (data) {
            return callback(false, {
              accessToken: data.access_token,
              accessTokenExpiresAt: data.access_token_expired_at,
              refreshToken: data.refresh_token,
              refreshTokenExpiresAt: data.refresh_token_expired_at,
              client: data.oauth_client,
              user: data.user,
            });
          }

          return callback(false, false);
        });
    },

    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#savetoken-token-client-user-callback
     * @param {object} token
     * @param {object} client
     * @param {object} user
     * @param {function} callback
     * @return {Promise.<object|boolean>}
     */
    saveToken: (token, client, user, callback) => {
      services.oauthToken.create({
        access_token: token.accessToken,
        access_token_expired_at: token.accessTokenExpiresAt,
        refresh_token: token.refreshToken,
        refresh_token_expired_at: token.refreshTokenExpiresAt,
        client_id: client.id,
        user_id: user.id,
      })
        .then(data => callback(false, {
          accessToken: data.access_token,
          accessTokenExpiresAt: data.access_token_expired_at,
          refreshToken: data.refresh_token,
          refreshTokenExpiresAt: data.refresh_token_expired_at,
          client: data.client_id,
          user: data.user_id,
        }));
    },

    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#getclient-clientid-clientsecret-callback
     * @param {uuid} clientId
     * @param {string} clientSecret
     * @param {function} callback
     * @return {Promise.<object|boolean>}
     */
    getClient: (clientId, clientSecret, callback) => {
      services.oauthClient.find({
        where: {
          id: clientId,
          secret_key: clientSecret,
        },
      })
        .then((data) => {
          if (data) return callback(false, data);

          return callback(false, false);
        });
    },

    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#getuser-username-password-callback
     * @param {string} username
     * @param {string} password
     * @param {function} callback
     * @return {Promise.<object|boolean>}
     */
    getUser: (username, password, callback) => {
      userServices.user.find({
        where: {
          username,
        },
      })
        .then((data) => {
          if (!data || (data && !data.comparePassword(password))) return callback(false, false);

          return callback(false, data);
        });
    },

    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#getrefreshtoken-refreshtoken-callback
     * @param {string} token
     * @param {function} callback
     * @return {Promise.<object|boolean>}
     */
    getRefreshToken: (token, callback) => {
      services.oauthToken.find({
        where: {
          refresh_token: token,
        },
        include: [
          { model: services.oauthClient },
          { model: userServices.user },
        ],
      })
        .then((data) => {
          if (data) {
            return callback(false, {
              refreshToken: data.refresh_token,
              refreshTokenExpiresAt: data.refresh_token_expired_at,
              // scope: data.scope,
              client: data.oauth_client,
              user: data.user,
            });
          }

          return callback(false, false);
        });
    },

    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#revoketoken-token-callback
     * @param {object} token
     * @param {function} callback
     * @return {Promise.<boolean>}
     */
    revokeToken: (token, callback) => {
      services.oauthToken.destroy({
        where: {
          refresh_token: token.refreshToken,
        },
      })
        .then(data => callback(false, !!data));
    },
  },

  debug: config.app.debug,
});
