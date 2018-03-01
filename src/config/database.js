module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || 'postgres',
    database: process.env.DB_DATABASE || '',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    seederStorage: 'sequelize',
  },
  test: {
    dialect: process.env.DB_DIALECT || 'postgres',
    database: process.env.DB_DATABASE || '',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    seederStorage: 'sequelize',
  },
  production: {
    dialect: process.env.DB_DIALECT || 'postgres',
    database: process.env.DB_DATABASE || '',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    seederStorage: 'sequelize',
    logging: false,
  },
};
