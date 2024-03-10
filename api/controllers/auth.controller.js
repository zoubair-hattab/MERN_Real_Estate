import User from '../models/user.model.js';
import ErrorHandler from '../utils/error.js';
import bcryptjs from 'bcryptjs';
export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username && !email && !password) {
      return next(new ErrorHandler('Kindly fill in the inputs.', 400));
    }
    if (!username) {
      return next(new ErrorHandler('Kindly fill in the username.', 400));
    }
    if (!email) {
      return next(new ErrorHandler('Kindly fill in the email.', 400));
    }
    if (!password) {
      return next(new ErrorHandler('Kindly fill in the password.', 400));
    }
    const userName = await User.find(username);
    if (userName) {
      return next(new ErrorHandler('usernem is already exist.', 400));
    }
    const userEmail = await User.find(email);
    if (userEmail) {
      return next(new ErrorHandler('email is already exist.', 400));
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    const user = await newUser.save();
    res.status(200).json({
      success: true,
      message: user,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
