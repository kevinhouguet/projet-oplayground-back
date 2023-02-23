const { Router } = require('express');

const apiRouter = new Router();

const { terrainsController, usersController } = require('../../controllers');

// exemple :
//apiRouter.get('/terrains', terrainsController.getTerrains);
//

apiRouter.get('/users/:id', usersController.getOneMember);
apiRouter.post('/users', usersController.addOneMember);

module.exports = apiRouter;






apiRouter.get('/terrains', terrainsController.playgroundList) 



apiRouter.get('/terrains/:id',terrainsController.playgroundById)



apiRouter.get('/terrains/:id/events', terrainsController.playgroundEvent);
    
