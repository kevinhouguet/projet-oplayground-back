const { Router } = require('express');

const apiRouter = new Router();

const { authenticationControl } = require('../../controllers/website/authenticationController');

const {
  terrainsController, usersController, controllerWrapper, eventsController,
} = require('../../controllers');

apiRouter.post('/users', controllerWrapper(usersController.addOneMember));
apiRouter.get('/users/:id', controllerWrapper(usersController.getOneMember));
apiRouter.delete('/users/:id', controllerWrapper(authenticationControl), controllerWrapper(usersController.deleteOneMember));
apiRouter.patch('/users/:id', controllerWrapper(authenticationControl), controllerWrapper(usersController.updateOneMember));

apiRouter.post('/users/signin', controllerWrapper(usersController.connectMember));

apiRouter.get('/terrains', controllerWrapper(terrainsController.playgroundList));

// apiRouter.get('/terrains/:id', controllerWrapper(terrainsController.playgroundById));

// apiRouter.get('/terrains/:id/events', controllerWrapper(terrainsController.playgroundEvent));

apiRouter.get('/users/:id/events', authenticationControl, controllerWrapper(eventsController.eventList));

apiRouter.post('/users/:id/events', authenticationControl, controllerWrapper(eventsController.addOneEvent));
apiRouter.patch('/events/:id', authenticationControl, controllerWrapper(eventsController.updateOneEvent));
apiRouter.delete('/events/:id', authenticationControl, controllerWrapper(eventsController.deleteOneEvent));

// ROUTE 404
apiRouter.use((req, res) => {
  res.status(404).json({ error: 'ressource not found' });
});

module.exports = apiRouter;
