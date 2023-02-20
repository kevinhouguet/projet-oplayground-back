const { Router } = require('express');

const apiRouter = new Router();

const { terrainsController } = require('../../controllers');

apiRouter.get('/terrains', terrainsController.getTerrains);

module.exports = apiRouter;
