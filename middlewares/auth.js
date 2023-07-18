const jwt = require('jsonwebtoken');
const config = require('../config');
const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
