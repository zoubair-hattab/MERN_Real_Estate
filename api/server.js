import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import ErrorHandler from './middleware/error.middleware.js';
import authRoutes from './routes/auth.router.js';
dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/v2/auth', authRoutes);
// it's for ErrorHandling
app.use(ErrorHandler);
app.listen(3000, async () => {
  await connectDB();
  console.log('Server running on port 3000');
});
