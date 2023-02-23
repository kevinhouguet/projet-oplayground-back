const { Router } = require('express');

const apiRouter = new Router();

const { terrainsController, usersController } = require('../../controllers');

// exemple :
apiRouter.get('/terrains', terrainsController.getTerrains);
//

// apiRouter.get('/users', usersController.getAllMember);
apiRouter.get('/users/:id', usersController.getOneMember);

module.exports = apiRouter;
