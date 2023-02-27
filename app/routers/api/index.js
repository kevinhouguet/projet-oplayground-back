const { Router } = require('express');

const apiRouter = new Router();

const { terrainsController, usersController, controllerWrapper } = require('../../controllers');

apiRouter.post('/users', controllerWrapper(usersController.addOneMember));
apiRouter.get('/users/:id', controllerWrapper(usersController.getOneMember));
apiRouter.delete('/users/:id', controllerWrapper(usersController.deleteOneMember));
apiRouter.patch('/users/:id', controllerWrapper(usersController.updateOneMember));

apiRouter.post('/users/signin', controllerWrapper(usersController.compareMember));

apiRouter.get('/terrains/:inseeCode', controllerWrapper(terrainsController.playgroundList));

// apiRouter.get('/terrains/:id', controllerWrapper(terrainsController.playgroundById));

apiRouter.get('/terrains/:id/events', controllerWrapper(terrainsController.playgroundEvent));

// ROUTE 404
apiRouter.use((req, res) => {
  res.status(404).json({ error: 'ressource not found' });
});

module.exports = apiRouter;
