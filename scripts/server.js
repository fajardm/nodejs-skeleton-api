#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config();
const chalk = require('chalk');

const app = require('../src');
const appConfig = require('../src/config/app');
const serverConfig = require('../src/config/server');
const debug = require('debug')(`${appConfig.name}:server`);// DEBUG=app:* npm start
const http = require('http');

console.log(chalk.green(`Running on ${chalk.underline(appConfig.env.toUpperCase())} environment`));

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
// eslint-disable-next-line no-shadow
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(serverConfig.port || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  console.log(chalk.bgBlue(`Server started on port ${serverConfig.PORT}`));
  console.log(chalk.bgBlue(`PID is ${process.pid}`));

  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
