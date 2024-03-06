import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const landlordSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },


});

landlordSchema.pre('save', async function(next){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model('Landlord', landlordSchema);