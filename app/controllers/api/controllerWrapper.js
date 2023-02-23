
function controllerWrapper(middleware){
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      console.log('controllerWrapper');
      res.json({error: err.message});
    }
  }
}

module.exports = controllerWrapper;