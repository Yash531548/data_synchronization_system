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

const localData = mongoose.model('LocalData', dataSchema);

export default localData;