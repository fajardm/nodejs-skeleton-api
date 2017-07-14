require('dotenv').config();
const _ = require('lodash');
const Sequelize = require('sequelize');

const appConfig = require('../config/app');
const databaseConfig = require('../config/database');

// Get db setting by env
const db = _.get(databaseConfig, appConfig.env);

// Create connection
const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  logging: db.logging || true,
  seederStorage: 'sequelize',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

module.exports = sequelize;
