import express from 'express';
import { createUser } from '../controllers/auth.controller.js';
const router = express.Router();
router.post('/sign-up', createUser);
export default router;
