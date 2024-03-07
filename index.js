import express from 'express';
import landlordRoutes from './routes/landlordRoutes.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import checkRole from './middleware/roleMiddleware.js';
import { signin, createNewUser } from './handlers/user.js';
import { protect } from './middleware/auth.js';





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

    //proerty owner register
    app.post('/registerPropertyOwner',checkRole('propertyOwner'),createNewUser)

    //property owner login
    app.get('/loginPropertyOwner',checkRole('propertyOwner'),signin)

    // admin login
    app.get('/adminlogin',checkRole('admin'),signin)

    //student login
    app.get('/studentlogin',checkRole('student'),signin)

    //warden login
    app.get('/wardenlogin',checkRole('warden',signin));
  
    app.use('/api',protect,router);
   

