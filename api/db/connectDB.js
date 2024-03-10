import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO);
    console.log(`Your DataBase running on host ,${connect.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;
