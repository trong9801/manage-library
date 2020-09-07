import mongoose from 'mongoose'
import { authordb } from '../models/author'

export const add = async (req, res, next) => {
    const { id } = req.body;
    const ID = toUpper(id)
    const data = await authordb.find({ id: ID });
    if (data[0]) {
        res.json('tac gia da ton tai')
    } else {
        const newAuthor = {
            _id: new mongoose.Types.ObjectId(),
            ...req.body,
            id: ID
        }
        await authordb.create(newAuthor);
        res.json('thanh cong')
    }
}
export const update = async (req, res, next) => {
    const { id } = req.body;
    const ID = toUpper(id)
    const data = await authordb.find({ id: ID })
    if (data[0]) {
        const udAuthor = {
            ...req.body,
            id: ID
        }
        await authordb.updateOne({ id: ID }, udAuthor)
        res.json('thanh cong')
    } else {
        res.json('tac gia khong ton tai')
    }
}
export const deleteAuthor = async (req, res, next) => {
    const { id } = req.body;
    const ID = toUpper(id)
    const data = await authordb.find({ id: ID })
    if (data[0]) {
        await authordb.remove({ id: ID })
        res.json('thanh cong')
    } else {
        res.json('tai khoan khong ton tai')
    }
}
export const getListAuthor = async (req, res, next) => {
    const data = await authordb.find();
    res.json(data)
}