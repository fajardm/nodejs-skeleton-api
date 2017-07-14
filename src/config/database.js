require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    database: `${process.env.DB_DATABASE}_development` || '',
    host: process.env.DB_HOST || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    seederStorage: 'sequelize',
  },
  test: {
    dialect: 'postgres',
    database: `${process.env.DB_DATABASE}_test` || '',
    host: process.env.DB_HOST || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    seederStorage: 'sequelize',
  },
  production: {
    dialect: 'postgres',
    database: process.env.DB_DATABASE || '',
    host: process.env.DB_HOST || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    seederStorage: 'sequelize',
    logging: false,
  },
};
