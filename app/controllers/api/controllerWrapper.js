
function controllerWrapper(middleware){
  return (req, res, next) => {
    try {
      middleware(req, res, next);
    } catch (err) {
      res.json({error: err.message});
      // next();
    }
  }
}

module.exports = controllerWrapper;