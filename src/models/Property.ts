import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        enum: ['hostel', 'home'],
        required: true
    },
    roomsAvailable: {
        type: Number,
        required: true
    },
    description: String,
    address: {
        line1: String,
        line2: String,
        line3: String,
        require: true
    },
    googleMapLocation: {
        locationName: String,
        coordinates: {
            type: "Point",
            coordinates: [longtitude,latitude]
        }
    },
    contactNumber: Number,
    roomRentPrice: {
        type: Number,
        required: true
    },
    keyMoneyPerRoom: {
        type: Number,
        required: true
    },
    photos: [String],
    propertyOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyOwner',
        required: true
    }
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
