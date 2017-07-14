const app = require('express')();

const controllers = require('./controllers');
const validations = require('./validations');

app.get('/', controllers.admin.index);

app.post('/', validations.register, controllers.common.create);

app.get('/:user_id', controllers.common.show);

app.put('/:user_id', controllers.common.update);

app.delete('/:user_id', controllers.admin.destroy);

module.exports = app;
