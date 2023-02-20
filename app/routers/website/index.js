const { Router } = require('express');

const websiteRouter = new Router();

websiteRouter.get('/', (req, res) => {
  res.send('Route principal');
});

module.exports = websiteRouter;
