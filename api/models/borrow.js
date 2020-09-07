import mongoose from 'mongoose';

const borrowSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    borrowDate: {
        type: Date,
        default: Date.now()
    },
    payDay: {
        type: Number,
        default: '3'
    },
    status:{
        type: Number,
        default: '1'
    },
    amount: {
        type: Number,
        default: '1'
    },
    createBy: String
})

export const borrowdb = mongoose.model('borrow', borrowSchema)