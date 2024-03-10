import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
dotenv.config();
const app = express();
app.listen(3000, async () => {
  await connectDB();
  console.log('Server running on port 3000');
});
