import { ObjectId } from "bson";
import mongoose from "mongoose";


const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        enum: ['admin','student','warden','propertyOwner'],
        require: true,

    },
    propertyOwnerDetails:{
        type: ObjectId,
        require: false,
    } 
    
})

export default mongoose.model('User',user);