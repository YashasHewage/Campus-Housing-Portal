import express from 'express'
//import adminRoutes from  ('./routes/adminRoutes');
//import authController from ('./controllers/authController');
import mongoose from 'mongoose';

import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

//app.use('/admin', adminRoutes);
//app.post('/login', authController.login);





app.listen(3000, () => {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then((res) => console.log('MongoDB connected Successfully...!'))
      .catch((error) => {
        console.log('MongoDB Error:', error.message);
        process.exit(1);
      });
  });