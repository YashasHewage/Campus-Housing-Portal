import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { createNewUser, signin } from './handlers/user.js';
import { protect } from './middleware/auth.js';
import router from './router.js';





const app = express();
dotenv.config()
app.use(cors());

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
    app.post('/registerPropertyOwner',createNewUser)
    
    //property owner login
    app.get('/loginPropertyOwner',signin)

    // admin login
    app.get('/loginAdmin',signin)

    //student login
    app.get('/studentlogin',signin)

    //warden login
    app.get('/wardenlogin',signin);
  
    app.use('/api',protect,router);
   

