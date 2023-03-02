const { Router } = require('express');
const { controllerErrorHandler } = require('../../controllers');
const { authenticationControl } = require('../../controllers/website/authenticationController');
const forgetpasswordController = require('../../controllers/website/forgetpasswordController');

const websiteRouter = new Router();

websiteRouter.get('/', (req, res) => {
  res.render('home');
});

websiteRouter.post('/forgetpassword', controllerErrorHandler(forgetpasswordController.process));
websiteRouter.get('/resetpassword/:token', controllerErrorHandler(forgetpasswordController.reset));

websiteRouter.use((req, res) => {
  res.status(404).render('notFound');
});

module.exports = websiteRouter;
