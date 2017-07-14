const co = require('co');
const httpStatus = require('http-status-codes');
const validate = require('validate.js');

module.exports = {
  /**
   * Asynchronous
   * @param req
   * @param res
   * @param next
   * @param constraint
   */
  async: (req, res, next, constraint) => {
    co(function* _() {
      yield validate.async(req.body, constraint);
      return next();
    })
      .catch(err => res.status(httpStatus.BAD_REQUEST).jsend.fail({ validations: err }));
  },

  /**
   * Synchronous
   * @param req
   * @param res
   * @param next
   * @param constraint
   * @return {*}
   */
  sync: (req, res, next, constraint) => {
    const error = validate(req.body, constraint);

    if (error) {
      return res.status(httpStatus.BAD_REQUEST).jsend.fail({ validations: error });
    }

    return next();
  },
};
