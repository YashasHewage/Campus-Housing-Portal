import { comparePasswords, createJWT, hashPassword } from "../middleware/auth";
import User from '../models/users.js';
import mongoose from "mongoose";


export const createNewUser = async (req,res) => {
    try {
        const { email, role } = req.body;
        let password = req.body.password;

        password = await hashPassword(password);

        let newUser
        if(role === 'propertyOwner'){
            const propertyOwnerDetails = new mongoose.Types.ObjectId();
            newUser = new User ({email, password, role, propertyOwnerDetails});
        }else {
            newUser = new User ({email, password, role});
        }

        const token = createJWT(newUser)
        res.json({token});
       
        await newUser.save();

    } catch (error ) {
        console.error(error);
        res.status(500).json(error.message);
    }

}
    





