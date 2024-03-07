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
        name: {
            type: String,
            enum: ['admin','student','warden','propertyOwner'],
            require: true,
        }
    },
    propertyOwnerDetails:{
        type: ObjectId,
        require: false,
    } 
    
})

export default mongoose.model('User',user);










// userSchema.pre('save', function (next) {
//     if (this.role === 'student') {
//         this.roleDetails = studentSchema;
//     } else if (this.role === 'landlord') {
//         this.roleDetails = landlordSchema;
//     }
//     next();
// });



// {
    
// }