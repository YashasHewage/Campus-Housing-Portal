import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    coordinates: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    },
    distance: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    propertyOwnerDetails:{
        email : {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        }
    },

    isInMap: {
        type: Boolean,
        required: false,
        default: false
    },
    availableRooms: {
        type: Number,
        required: true
    },


    isRented: {
        type: Boolean,
        default: false,
        required: false,
    },
    rentalRequests: [{ type: mongoose.Schema.Types.Mixed, ref: 'RentalRequest' }]
});

export default mongoose.model('Property', propertySchema);
