import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
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
        default: Date.now,
        required: false
    },
    author : {
        type: String,
        required: true
    }
});

export default mongoose.model('Article', articleSchema);