const { Router } = require('express');
const forgetpasswordController = require('../../controllers/website/forgetpasswordController');

const websiteRouter = new Router();

websiteRouter.get('/', (req, res) => {
  res.render('home');
});

websiteRouter.get('/forgetpassword', forgetpasswordController.process);

websiteRouter.use((req, res) => {
  res.status(404).render('notFound');
});

module.exports = websiteRouter;
