const httpStatus = require('http-status-codes');
const validate = require('./');

module.exports = {
  /**
   * Asynchronous
   * @param req
   * @param res
   * @param next
   * @param constraint
   */
  async: async (req, res, next, constraint) => {
    try {
      await validate.async(req.body, constraint);
      return next();
    } catch (e) {
      return res.status(httpStatus.BAD_REQUEST).jsend.fail({ validations: e });
    }
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
