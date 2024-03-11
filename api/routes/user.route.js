import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { deleteUser, updateUser } from '../controllers/user.controller.js';
const router = express();
router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
