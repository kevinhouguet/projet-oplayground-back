const jwt = require('jsonwebtoken');
const ApiForbiddenError = require('../../errors/ApiForbiddenError');
const ApiUnauthorizeError = require('../../errors/ApiUnauthorizeError');

module.exports = {
  authenticationControl(req, res, next) {
    const authHeader = req.headers.authorization;
    // Permet d'assigner la première valeur null ou bien la dernière valeur passée
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      throw new ApiUnauthorizeError('Token null');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        throw new ApiForbiddenError('Invalid JWT Signature');
      }
      req.user = user;
    });
    next();
  },
};
