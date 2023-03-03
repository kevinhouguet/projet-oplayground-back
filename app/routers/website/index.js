const { Router } = require('express');

const websiteRouter = new Router();

websiteRouter.get('/', (req, res) => {
  res.render('home');
});

websiteRouter.use((req, res) => {
  res.status(404).render('notFound');
});

module.exports = websiteRouter;
