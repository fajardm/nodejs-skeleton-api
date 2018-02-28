const OauthServer = require('express-oauth-server');

const config = require('../../../../config');
const repositories = require('../../../domain/repositories');

const OauthTokenRepo = repositories.oauthToken;
const OauthClientRepo = repositories.oauthClient;
const UserRepo = repositories.user;

module.exports = new OauthServer({
  model: {
    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#getaccesstoken-accesstoken-callback
     *
     * @param {string} accessToken
     *
     * @return {Promise.<object|boolean>}
     */
    getAccessToken: async (accessToken) => {
      const res = await OauthTokenRepo.find({
        access_token: accessToken,
      }).include([
        { model: OauthTokenRepo.OauthClient },
        { model: OauthTokenRepo.User },
      ]).get();

      if (res) {
        return {
          accessToken: res.access_token,
          client_id: res.oauth_client.id,
          accessTokenExpiresAt: res.access_token_expired_at,
          user_id: res.user.id,
        };
      }

      return false;
    },

    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#savetoken-token-client-user-callback
     *
     * @param {object} token
     * @param {object} client
     * @param {object} user
     *
     * @return {Promise.<object|boolean>}
     */
    saveAccessToken: async (token, client, user) => {
      const res = await OauthTokenRepo.create({
        access_token: token.accessToken,
        access_token_expired_at: token.accessTokenExpiresAt,
        refresh_token: token.refreshToken,
        refresh_token_expired_at: token.refreshTokenExpiresAt,
        client_id: client.id,
        user_id: user.id,
      });

      if (res) {
        return {
          accessToken: res.access_token,
          accessTokenExpiresAt: res.access_token_expired_at,
          refreshToken: res.refresh_token,
          refreshTokenExpiresAt: res.refresh_token_expired_at,
          client_id: res.client_id,
          user_id: res.user_id,
        };
      }

      return false;
    },

    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#getclient-clientid-clientsecret-callback
     *
     * @param {uuid} clientId
     * @param {string} clientSecret
     *
     * @return {Promise.<object|boolean>}
     */
    getClient: async (clientId, clientSecret) => {
      const res = await OauthClientRepo.find({
        id: clientId,
        secret_key: clientSecret,
      }).get();

      if (res) {
        return {
          clientId: res.id,
          clientSecret: res.secret_key,
          grants: res.grants,
        };
      }

      return false;
    },

    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#getuser-username-password-callback
     *
     * @param {string} id
     * @param {string} password
     *
     * @return {Promise.<object|boolean>}
     */
    getUser: async (id, password) => {
      const res = await UserRepo.findByEmailOrUsername(id, id).get();

      if (res && UserRepo.comparePassword(password)) {
        return res;
      }

      return false;
    },

    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#getrefreshtoken-refreshtoken-callback
     *
     * @param {string} token
     *
     * @return {Promise.<object|boolean>}
     */
    getRefreshToken: async (token) => {
      const res = await OauthTokenRepo.find({
        refresh_token: token,
      }).include([
        { model: OauthTokenRepo.OauthClient },
        { model: OauthTokenRepo.User },
      ]).get();

      if (res) {
        return {
          refreshToken: res.refresh_token,
          refreshTokenExpiresAt: res.refresh_token_expired_at,
          client_id: res.oauth_client.id,
          user_id: res.user.id,
        };
      }

      return false;
    },

    /**
     * http://oauth2-server.readthedocs.io/en/latest/model/spec.html#revoketoken-token-callback
     *
     * @param {object} token
     *
     * @return {Promise.<boolean>}
     */
    revokeToken: async (token) => {
      const res = await OauthTokenRepo.find({ refresh_token: token.refreshToken }).destroy();
      return !!res;
    },
  },

  debug: config.APP.DEBUG,
});
