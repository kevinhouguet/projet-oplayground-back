const jwt = require('jsonwebtoken');

module.exports = {
  authenticationControl(req, res, next) {
    const authHeader = req.headers.authorization;
    // Permet d'assigner la première valeur null ou bien la dernière valeur passée
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      // res.sendStatus(401);
      throw new Error('please add a token');
    }
    console.log(token);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        // res.sendStatus(403);
        console.log(process.env.ACCESS_TOKEN_SECRET);
        throw new Error('forbidden');
      }
      req.user = user;
    });
    next();
  },
};
