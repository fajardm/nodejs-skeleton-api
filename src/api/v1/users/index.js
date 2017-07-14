const app = require('express')();

const controllers = require('./controllers');
const validations = require('./validations');

app.get('/', controllers.admin.index);
app.post('/', validations.register, controllers.common.register);

module.exports = app;
