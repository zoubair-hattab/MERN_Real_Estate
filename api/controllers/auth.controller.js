import User from '../models/user.model.js';
import ErrorHandler from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
    const userName = await User.findOne({ username });
    if (userName) {
      return next(new ErrorHandler('usernem is already exist.', 400));
    }
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler('email is already exist.', 400));
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username: username?.replace(/ /g, ''),
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: 'Signup successful',
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler('Thers is something in your creditial.'));
    }
    const isamePassword = bcryptjs.compareSync(password, user.password);
    if (!isamePassword) {
      return next(new ErrorHandler('Thers is something in your creditial.'));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json({
        success: true,
        message: rest,
      });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const google = async (req, res, next) => {
  try {
    const { username, email, userPhoto } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const token = jwt.sign({ id: userEmail._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = userEmail._doc;

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json({
          success: true,
          message: rest,
        });
    } else {
      const genratePassword = (
        Math.random().toString(36).slice(-8) +
        username +
        Math.random().toString(36).slice(-8)
      ).replace(/ /g, '');
      const hashPassword = bcryptjs.hashSync(genratePassword, 10);
      const uinqueUsername =
        username +
        Math.random().toString(36).slice(-8).replace(/ /g, '').toLowerCase();

      const newUser = new User({
        username: uinqueUsername,
        email,
        password: hashPassword,
        userPhoto,
      });

      const saveUser = await newUser.save();
      const token = jwt.sign({ id: saveUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = saveUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json({
          success: true,
          message: rest,
        });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json({
      success: true,
      message: null,
    });
  } catch (error) {
    next(error);
  }
};
