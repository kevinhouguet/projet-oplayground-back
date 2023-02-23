const { Router } = require('express');

const websiteRouter = new Router();

websiteRouter.get('/', (req, res) => {
  res.send('Route principal');
});

websiteRouter.use((req,res) => {
  res.status(404).render('notFound');
})

module.exports = websiteRouter;
