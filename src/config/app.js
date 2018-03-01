module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  NAME: process.env.APP_NAME || 'APP',
  KEY: process.env.APP_KEY || 'CHANGE_THIS_IN_PRODUCTION',
  LOG_LEVEL: process.env.APP_LOG_LEVEL || 'dev',
  DEBUG: process.env.APP_DEBUG || true,
};
