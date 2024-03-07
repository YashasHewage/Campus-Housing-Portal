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

export const signin = async (req, res) => {
    const {email, role } = req.body ;

    const user = await User.findone({ email,role });

   
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValid = await comparePasswords(req.body.password, User.password)

    if(!isValid) {
        res.status(401)
        res.json({mesage: 'nope'})
        return
    }

    const token = createJWT(user)
    res.json({ token })


}
    





