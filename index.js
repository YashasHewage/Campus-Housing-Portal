import express from 'express';
import landlordRoutes from './routes/landlordRoutes.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import checkRole from './middleware/roleMiddleware.js';
import { signin, createNewUser } from './handlers/user.js';
import adminRoutes from './routes/adminRoutes.js';




const app = express();
dotenv.config()

const PORT = process.env.PORT || 3000;
const MOGOURL = process.env.MONGO_URL


mongoose
    .connect(MOGOURL)
    .then(() => {
        console.log("Database is connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });



   
    app.use(express.json());

    app.use('/registerPropertyOwner',checkRole('propertyOwner'),createNewUser)
    app.use('/loginPropertyOwner',checkRole('propertyOwner'),signin)

    app.use('/adminlogin',checkRole('admin'),signin)
  
    //app.use('/admin', adminRoutes);
    app.use('/api/admin',adminRoutes);
   
//app.post('/login', authController.login);
