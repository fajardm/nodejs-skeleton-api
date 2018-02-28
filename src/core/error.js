/* eslint-disable no-console */
const httpStatus = require('http-status-codes');

const config = require('../config/index');

module.exports = (app) => {
  /**
   * Handler 404
   */
  app.use((req, res) => {
    res.status(404);
    return res.status(httpStatus.NOT_FOUND).jsend.fail('not found');
  });

  /**
   * Handler 500
   */
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    // only providing error in development
    err.message = config.APP.ENV === 'development' ? err.message : 'internal server error';
    res.status(500);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).jsend.error(err.message);
  });
};