// /* eslint-disable no-console */
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const compression = require('compression');
// const express = require('express');
// const jsend = require('jsend');
// const logger = require('morgan');
// const path = require('path');
//
// const appConfig = require('./config/models');
// const initializeCore = require('./core/initialize');
//
// const models = express();
//
// models.use(jsend.middleware);
// models.use(logger(appConfig.logLevel));
// models.set('trust proxy', 1);
// const whiteListed = process.env.ALLOWED_ORIGINS || '';
// models.use(cors({
//   origin: (origin, cb) => {
//     const isWhiteListed = whiteListed.split(',').indexOf(origin) > -1;
//
//     cb(null, isWhiteListed);
//   },
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));
// models.use(compression());
// models.use(bodyParser.json());
// models.use(bodyParser.urlencoded({ extended: true }));
// models.use(express.static(path.join(__dirname, 'public')));
// models.use(initializeCore);
//
// models.get('/', (req, res) => {
//   res.jsend.success({
//     name: `${appConfig.name} REST API`,
//   });
// });
//
// models.use('/v1', require('./api/v1'));
//
// // catch 404
// models.use((req, res) => {
//   res.status(404).jsend.fail('Endpoint not found');
// });
//
// // @todo Add error handling to third party or display to console log
// // error handler
// // eslint-disable-next-line no-unused-vars
// models.use((err, req, res, next) => {
//   // only providing error in development
//   const tempError = err;
//   tempError.message = appConfig.env === 'development' ? err.message : 'Internal Server Error';
//
//   res.status(500).jsend.error(tempError);
// });
//
// module.exports = models;
/* eslint-disable no-console */
require('dotenv').config();
const app = require('./core');
const config = require('./config');

const bootstrap = () => {
  app.listen(config.SERVER.PORT, config.SERVER.HOST, () => {
    console.log('========================');
    console.log(`APP_PORT: ${config.SERVER.PORT}`);
    console.log(`APP_IP: ${config.SERVER.HOST}`);
    console.log('========================');
  });
};

bootstrap();
