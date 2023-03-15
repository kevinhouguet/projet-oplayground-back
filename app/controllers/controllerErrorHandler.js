// JS Design pattern : Factory
// middleware = usersController.addOneMember = (req,res) => ...
function controllerWrapper(middleware) {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next); // usersController.addOneMember()
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = controllerWrapper;
