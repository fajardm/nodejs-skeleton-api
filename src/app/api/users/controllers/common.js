const co = require('co');
const httpStatus = require('http-status-codes');

const services = require('../services/index');

const controllers = {
  /**
   * Create new user
   */
  create: (req, res) => {
    co(function* _() {
      const user = yield services.user.createWithEncryptPassword({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      return res.status(httpStatus.OK).jsend.success({
        user,
      });
    })
      .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).jsend.error(err));
  },

  /**
   * Get details user
   */
  show: (req, res) => {
    co(function* _() {
      const user = yield services.user.findById(req.params.user_id);

      if (!user) {
        return res.status(httpStatus.NOT_FOUND).jsend.fail('User not found');
      }

      return res.status(httpStatus.OK).jsend.success({ user });
    })
      .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).jsend.error(err));
  },

  /**
   * Update user by user_id
   */
  update: (req, res) => {
    co(function* _() {
      const user = yield services.user.findById(req.params.user_id);

      if (!user) {
        return res.status(httpStatus.NOT_FOUND).jsend.fail('User not found');
      }

      user.email = req.body.email;
      user.username = req.body.username;

      yield user.save();

      return res.status(httpStatus.OK).jsend.success({ user });
    })
      .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).jsend.error(err));
  },
};

module.exports = controllers;
