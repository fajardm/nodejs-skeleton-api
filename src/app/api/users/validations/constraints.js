const services = require('../services/index');

const constraints = {
  register: {
    email: {
      presence: true,
      email: true,
      recordExists: { services: services.user },
    },
    username: {
      presence: true,
      recordExists: { services: services.user },
    },
    password: {
      presence: true,
    },
  },
};

module.exports = constraints;
