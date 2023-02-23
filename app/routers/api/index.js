const { Router } = require('express');

const apiRouter = new Router();

const controllerWrapper = require('../../controllers/api/controllerWrapper');

const { terrainsController, usersController } = require('../../controllers');

// exemple :
//apiRouter.get('/terrains', terrainsController.getTerrains);
//

apiRouter.get('/users/:id', usersController.getOneMember);
apiRouter.post('/users', usersController.addOneMember);

module.exports = apiRouter;


apiRouter.get('/terrains', controllerWrapper(terrainsController.playgroundList)) 



apiRouter.get('/terrains/:id',terrainsController.playgroundById)



apiRouter.get('/terrains/:id/events', terrainsController.playgroundEvent);


apiRouter.use((req,res) => {
  res.status(404).json({error: 'ressource not found'});
})