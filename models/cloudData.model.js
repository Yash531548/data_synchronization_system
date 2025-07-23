import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    updatedAt: { type: Date, default: Date.now }
});

const cloudData = mongoose.model('CloudData', dataSchema);

export default cloudData;
