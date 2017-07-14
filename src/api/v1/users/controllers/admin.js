const co = require('co');
const httpStatus = require('http-status-codes');

const services = require('../services');

const controllers = {
  /**
   * Get users lists
   */
  index: (req, res) => {
    co(function* _() {
      const user = yield services.user.findAll({
        offset: 0,
        limit: 5,
        attributes: {
          exclude: services.hiddenAttributes,
        },
      });

      return res.status(httpStatus.OK).jsend.success({
        user,
      });
    })
      .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).jsend.error(err));
  },

  /**
   * Destroy user by user_id
   */
  destroy: (req, res) => {
    co(function* _() {
      const user = yield services.user.findById(req.params.user_id);

      if (!user) {
        return res.status(httpStatus.NOT_FOUND).jsend.fail('User not found');
      }

      yield user.destroy();

      return res.status(httpStatus.OK).jsend.success({ user });
    })
      .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).jsend.error(err));
  },
};

module.exports = controllers;
