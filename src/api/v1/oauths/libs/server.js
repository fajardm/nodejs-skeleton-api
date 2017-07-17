const InvalidArgumentError = require('oauth2-server/lib/errors/invalid-argument-error');
const NodeOAuthServer = require('oauth2-server');
const Promise = require('bluebird');
const Request = require('oauth2-server').Request;
const Response = require('oauth2-server').Response;
const UnauthorizedRequestError = require('oauth2-server/lib/errors/unauthorized-request-error');


const handleResponse = function _(req, res, response) {
  if (response.status === 302) {
    const location = response.headers.location;
    delete response.headers.location;
    res.set(response.headers);
    res.redirect(location);
  } else {
    res.set(response.headers);
    res.status(response.status).send(response.body);
  }
};

const handleError = function _(e, req, res, response, next) {
  if (this.useErrorHandler === true) {
    next(e);
  } else {
    if (response) {
      res.set(response.headers);
    }

    res.status(e.code);

    if (e instanceof UnauthorizedRequestError) {
      res.send({ error: e.name, error_description: e.message });
    }

    res.send({ error: e.name, error_description: e.message });
  }
};

function ExpressOAuthServer(options) {
  const tempOptions = options || {};

  if (!tempOptions.model) {
    throw new InvalidArgumentError('Missing parameter: `model`');
  }

  this.useErrorHandler = !!tempOptions.useErrorHandler;
  delete tempOptions.useErrorHandler;

  this.continueMiddleware = !!tempOptions.continueMiddleware;
  delete tempOptions.continueMiddleware;

  this.server = new NodeOAuthServer(options);
}

ExpressOAuthServer.prototype.authenticate = function _(options) {
  const that = this;

  return function _(req, res, next) {
    const request = new Request(req);
    const response = new Response(res);

    return Promise.bind(that)
      .then(function _() {
        return this.server.authenticate(request, response, options);
      })
      .tap((token) => {
        res.locals.oauth = { token };
        next();
      })
      .catch(function _(e) {
        return handleError.call(this, e, req, res, null, next);
      });
  };
};

ExpressOAuthServer.prototype.authorize = function _(options) {
  const that = this;

  return function _(req, res, next) {
    const request = new Request(req);
    const response = new Response(res);

    return Promise.bind(that)
      .then(function _() {
        return this.server.authorize(request, response, options);
      })
      .tap(function _(code) {
        res.locals.oauth = { code };
        if (this.continueMiddleware) {
          next();
        }
      })
      .then(function _() {
        return handleResponse.call(this, req, res, response);
      })
      .catch(function _(e) {
        return handleError.call(this, e, req, res, response, next);
      });
  };
};

ExpressOAuthServer.prototype.token = function _(options) {
  const that = this;

  return function _(req, res, next) {
    const request = new Request(req);
    const response = new Response(res);

    return Promise.bind(that)
      .then(function _() {
        return this.server.token(request, response, options);
      })
      .tap(function _(token) {
        res.locals.oauth = { token };
        if (this.continueMiddleware) {
          next();
        }
      })
      .then(function _() {
        return handleResponse.call(this, req, res, response);
      })
      .catch(function _(e) {
        return handleError.call(this, e, req, res, response, next);
      });
  };
};

module.exports = ExpressOAuthServer;
