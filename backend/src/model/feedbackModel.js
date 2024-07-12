import mongoose from 'mongoose';

const feedbackModel = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    feedbackDescription: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    },
);


export default mongoose.model('Feedback', feedbackModel);


