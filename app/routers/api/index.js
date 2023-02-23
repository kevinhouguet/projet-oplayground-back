const { Router } = require('express');

const apiRouter = new Router();

const { terrainsController, usersController, controllerWrapper  } = require('../../controllers');

apiRouter.get('/users/:id', controllerWrapper(usersController.getOneMember));
apiRouter.post('/users', controllerWrapper(usersController.addOneMember));

apiRouter.get('/terrains', controllerWrapper(terrainsController.playgroundList));

apiRouter.get('/terrains/:id', controllerWrapper(terrainsController.playgroundById));

apiRouter.get('/terrains/:id/events', controllerWrapper(terrainsController.playgroundEvent));

// ROUTE 404
apiRouter.use((req,res) => {
  res.status(404).json({error: 'ressource not found'});
})


module.exports = apiRouter;