const terrainsController = require('./api/terrainsController');
const usersController = require('./api/usersController');
const controllerErrorHandler = require('./controllerErrorHandler');
const eventsController = require('./api/eventsController');

module.exports = {
  terrainsController,
  usersController,
  controllerErrorHandler,
  eventsController,
};
