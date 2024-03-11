import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import ErrorHandler from './middleware/error.middleware.js';
import authRoutes from './routes/auth.router.js';
import userRoutes from './routes/user.route.js';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/v2/auth', authRoutes);
app.use('/api/v2/user', userRoutes);

// it's for ErrorHandling
app.use(ErrorHandler);
app.listen(3000, async () => {
  await connectDB();
  console.log('Server running on port 3000');
});
