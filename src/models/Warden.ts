import mongoose from "mongoose";

const wardenSchema = new mongoose.Schema({
    universityID: {
        type: String,
        required: true,
        unique: true
    },
    wardenEmail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Warden = mongoose.model('Warden', wardenSchema);

export default Warden;
