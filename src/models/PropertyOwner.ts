import mongoose from "mongoose";

const propertyOwnerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: String
});

const PropertyOwner = mongoose.model('PropertyOwner', propertyOwnerSchema);

export default PropertyOwner;
