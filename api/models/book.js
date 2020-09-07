import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'none'],
        default: 'active'
    },
    name: {
        type: String,
        required: true
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }],
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author'
    }],
    publishingyear: Number,
    description: String,
    amount: {
        type: Number,
        default: '0'
    }
})

export const bookdb = mongoose.model('book', bookSchema)