require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  name: process.env.APP_NAME || 'APP',
  key: process.env.APP_KEY || 'CHANGE_THIS_IN_PRODUCTION',
  logLevel: process.env.APP_LOG_LEVEL || 'dev',
  debug: process.env.APP_DEBUG || true,
};
