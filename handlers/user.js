import {createJWT,hashPassword,comparePasswords} from '../middleware/auth.js';
import User from '../models/users.js';
import mongoose from "mongoose";



export const createNewUser = async (req,res) => {
    try {
        const { email, role } = req.body;

        const user = await User.findOne({ email,role });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
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
        res.json({token,message: 'User created successfully'});
       
        await newUser.save();

    } catch (error ) {
        console.error(error);
        res.status(500).json(error.message);
    }

}

export const signin = async (req, res) => {
    const {email, role } = req.body ;

    const user = await User.findOne({ email,role });

   
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValid = await comparePasswords(req.body.password, user.password)

    if(!isValid) {
        res.status(401)
        res.json({message: 'nope'})
        return
    }

    const token = createJWT(user)
    res.json({ token })


}
    





