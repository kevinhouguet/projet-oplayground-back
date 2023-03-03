function controllerWrapper(middleware) { // middleware = usersController.addOneMember
  return async (req, res, next) => {
    try {
      await middleware(req, res, next); // usersController.addOneMember()
    } catch (err) {
      next(err);
    }
  };
}

module.exports = controllerWrapper;
