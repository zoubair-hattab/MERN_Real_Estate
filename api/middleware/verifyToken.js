import ErrorHandler from '../utils/error.js';
import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new ErrorHandler('Your not authenticated'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new ErrorHandler('Unauthorized', 401));
    }
    req.user = user;
    next();
  });
};
