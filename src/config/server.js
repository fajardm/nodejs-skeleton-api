require('dotenv').config();

module.exports = {
  host: process.env.SERVER_HOST || '0.0.0.0',
  port: process.env.SERVER_PORT || '3000',
  https: process.env.SERVER_HTTPS || false,
};
