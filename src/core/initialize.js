const _ = require('lodash');
const co = require('co');
const validate = require('validate.js');

module.exports = (req, res, next) => {
  // add custom validators
  validate.validators.recordExists = function __(value, options, key, attributes) {
    const where = {};
    where[key] = value;

    // eslint-disable-next-line no-unused-vars
    return new validate.Promise((resolve, reject) => {
      co(function* _() {
        const data = yield options.services.find({
          where,
        });

        if (data) {
          resolve('exists');
        }

        resolve();
      })
        .catch(() => resolve('exists'));
    });
  };

  validate.validators.presenceDepend = function __(value, options, key, attributes) {
    if (!value && _.get(attributes, options.field) === options.eq) {
      return {
        presence: true,
      };
    }

    return null;
  };

  next();
};
