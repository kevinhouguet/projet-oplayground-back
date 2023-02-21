const { Router } = require('express');

const websiteRouter = new Router();

websiteRouter.get('/', (req, res) => {
  res.render('home');
});

module.exports = websiteRouter;
