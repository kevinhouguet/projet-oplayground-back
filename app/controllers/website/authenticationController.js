const jwt = require('jsonwebtoken');

module.exports = {
  authenticationControl(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader + authHeader.split(' ')[1];
    if (token == null) {
      // res.sendStatus(401);
      throw new Error('please add a token');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        // res.sendStatus(403);
        throw new Error('forbidden');
      }
      req.user = user;
      next();
    });
    next();
  },
};
