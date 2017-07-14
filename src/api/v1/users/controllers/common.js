const co = require('co');
const httpStatus = require('http-status-codes');

const services = require('../services');

const controllers = {
  register: (req, res) => {
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
};

module.exports = controllers;
