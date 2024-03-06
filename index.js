import express from 'express';
import landlordRoutes from './routes/landlordRoutes.js';

//import adminRoutes from  ('./routes/adminRoutes.js');
//import authController from ('./controllers/authController.js');
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
dotenv.config()

const app = express();
const PORT = 3000;
app.use(express.json());


mongoose
.connect('mongodb://localhost:27017/new_test')
.then(() => console.log('MongoDB connected Successfully...!'))
.catch((error) => {
  console.log('MongoDB Error:', error.message);
  process.exit(1);
});




//app.use('/admin', adminRoutes);
app.use('/api/landlord', landlordRoutes);
//app.post('/login', authController.login);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  });