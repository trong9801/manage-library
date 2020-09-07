import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: String,
        default: 'active'
    },
    name: {
        type: String,
        required: true
    },
    birthyear: Number
})

export const userdb = mongoose.model('user', userSchema)