import express from 'express';
import {
  createUser,
  google,
  loginUser,
  logout,
} from '../controllers/auth.controller.js';
const router = express.Router();
router.post('/sign-up', createUser);
router.post('/sign-in', loginUser);
router.post('/google', google);

router.all('/logout', logout);

export default router;
