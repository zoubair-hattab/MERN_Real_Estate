import User from '../models/user.model.js';
import ErrorHandler from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.user) {
      return next(new ErrorHandler('Your are not authoirzed', 404));
    }
    if (req.user.id !== req.params.id) {
      return next(
        new ErrorHandler("You don't have permission to chanthis account.", 400)
      );
    }
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          userPhoto: req.body.userPhoto,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updateUser._doc;
    res.status(200).json({
      success: true,
      message: rest,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(
        new ErrorHandler("You don't have permission to chanthis account.", 400)
      );
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: null,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
