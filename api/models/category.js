import mongoose from 'mongoose';
const cateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    description: String
})
export const categorydb = mongoose.model('category', cateSchema);