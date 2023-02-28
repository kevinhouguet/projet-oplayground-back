const { Router } = require('express');

const apiRouter = new Router();

const { authenticationControl } = require('../../controllers/website/authenticationController');

const {
  terrainsController, usersController, controllerErrorHandler, eventsController,
} = require('../../controllers');
const apiErrorController = require('../../controllers/api/apiErrorController');
const NotFoundError = require('../../errors/NotFound');

apiRouter.post('/users', controllerErrorHandler(usersController.addOneMember));
apiRouter.get('/users/:userId(\\d+)', controllerErrorHandler(authenticationControl), controllerErrorHandler(usersController.getOneMember));
apiRouter.delete('/users/:userId', controllerErrorHandler(authenticationControl), controllerErrorHandler(usersController.deleteOneMember));
apiRouter.patch('/users/:userId', controllerErrorHandler(authenticationControl), controllerErrorHandler(usersController.updateOneMember));

apiRouter.post('/users/signin', controllerErrorHandler(usersController.connectMember));

apiRouter.get('/terrains', controllerErrorHandler(terrainsController.playgroundList));

// apiRouter.get('/terrains/:id', controllerErrorHandler(terrainsController.playgroundById));

// apiRouter.get('/terrains/:id/events', controllerErrorHandler(terrainsController.playgroundEvent));

apiRouter.get('/users/:userId/events', authenticationControl, controllerErrorHandler(eventsController.eventList));

apiRouter.post('/users/:userId/events', authenticationControl, controllerErrorHandler(eventsController.addOneEvent));
apiRouter.patch('/events/:eventId', authenticationControl, controllerErrorHandler(eventsController.updateOneEvent));
apiRouter.delete('/events/:eventId', authenticationControl, controllerErrorHandler(eventsController.deleteOneEvent));

// ROUTE 404
apiRouter.use((req, res, next) => {
  next(new NotFoundError());
});

// Gestionnaire d'erreur
apiRouter.use(apiErrorController.errorHandler);

module.exports = apiRouter;
