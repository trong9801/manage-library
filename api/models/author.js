import mongoose from 'mongoose';

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String
})
export const authordb = mongoose.model('author', authorSchema);