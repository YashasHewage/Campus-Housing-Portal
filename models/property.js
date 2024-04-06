import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: false
    },
    coordinates: {
        latitude: {
            type: Number,
            required: false
        },
        longitude: {
            type: Number,
            required: false
        }
    },
    distance: {
        type: Number,
        required: false
    },
    image1 : {
        type: String,
        required: false
    },
    image2 : {
        type: String,
        required: false
    },
    image3 : {
        type: String,
        required: false
    },

    propertyOwnerDetails:{
        email : {
            type: String,
            required: false
        },
        mobile: {
            type: Number,
            required: false
        }
    },

    isInMap: {
        type: Boolean,
        required: false,
        default: false
    },
    availableRooms: {
        type: Number,
        required: false
    },


    isRented: {
        type: Boolean,
        default: true,
        required: false,
    },
    rentalRequests: [{ type: mongoose.Schema.Types.Mixed, ref: 'RentalRequest' }]
});

export default mongoose.model('Property', propertySchema);
