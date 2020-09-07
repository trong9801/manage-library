import mongoose from 'mongoose'
import { categorydb } from '../models/category'

export const add = async (req, res, next) => {
    const { id } = req.body;
    const ID = toUpper(id)
    const data = await categorydb.find({ id: ID });
    if (data[0]) {
        res.json('the loai da ton tai')
    } else {
        const newCategory = {
            _id: new mongoose.Types.ObjectId(),
            ...req.body,
            id: ID
        }
        await categorydb.create(newCategory);
        res.json('thanh cong')
    }
}
export const update = async (req, res, next) => {
    const { id } = req.body;
    const ID = toUpper(id)
    const data = await categorydb.find({ id: ID })
    if (data[0]) {
        const update = {
            ...res.body,
            id: ID
        }
        await categorydb.updateOne({ id: ID }, update)
        res.json('thanh cong')
    } else {
        res.json('tai khoan khong ton tai')
    }
}
export const deleteCategory = async (rew, res, next) => {
    const { id } = req.body;
    const ID = toUpper(id)
    const data = await categorydb.find({ id: ID })
    if (data[0]) {
        await categorydb.remove({ id: ID })
        res.json('thanh cong')
    } else {
        res.json('tai khoan khong ton tai')
    }
}
export const getListCategory = async (req, res, next) => {
    const data = await categorydb.find();
    res.json(data)
}