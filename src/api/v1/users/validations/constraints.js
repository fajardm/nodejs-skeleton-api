const co = require('co');
const validate = require('validate.js');

const services = require('../services');

const constraints = {
  register: {
    email: {
      presence: true,
      email: true,
      alreadyExists: (value, attributes, attributeName, options) => new validate.Promise((resolve, reject) => {
        co(function* _() {
          const user = yield services.user.find({
            where: {
              email: value,
            },
          });
          if (user) {
            resolve('exists');
          }
          resolve();
        })
          .catch(e => resolve(e.message));
      }),
    },
    username: {
      presence: true,
    },
    password: {
      presence: true,
    },
  },
};

module.exports = constraints;
