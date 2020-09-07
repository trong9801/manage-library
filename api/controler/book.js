import mongoose from 'mongoose'
import { bookdb } from '../models/book'
import { authordb } from '../models/author'
import { borrowdb } from '../models/borrow'
import { categorydb } from '../models/category'
import { toUpper } from 'lodash'
import escapeStringRegexp from 'escape-string-regexp'

export const add = async (req, res, next) => {
    const { category, author, id } = req.body
    const ID = toUpper(id)
    const dataBook = await bookdb.find({ id: ID })
    if (dataBook[0]) {
        res.json('sach da ton tai')
    } else {
        const newBook = {
            _id: new mongoose.Types.ObjectId(),
            ...req.body,
            id: ID
        }
        if (author) {
            let value;
            let c = [];
            for (value of author) {
                let data = await authordb.find({ id: value });
                c = c.concat(data[0]._id);
            }
            newBook.author = c;
        }
        if (category) {
            let value;
            let c = [];
            for (value of category) {
                let data = await categorydb.find({ id: value });
                c = c.concat(data[0]._id);
            }
            newBook.category = c;
        }
        await bookdb.create(newBook);
        res.json('thanh cong');
    }
}
export const update = async (req, res, next) => {
    const { id, author, category, status } = req.body;
    const ID = toUpper(id)
    const data = await bookdb.find({ id: ID });
    if (data[0]) {
        const update = {
            ...req.body,
            id: ID
        }
        if (author) {
            let value;
            let c = [];
            for (value of author) {
                let data = await authordb.find({ id: value });
                c = c.concat(data[0]._id);
            }
            update.author = c;
        }
        if (category) {
            let value;
            let c = [];
            for (value of category) {
                let data = await categorydb.find({ id: value });
                c = c.concat(data[0]._id);
            }
            update.category = c;
        }
        await bookdb.updateOne({ id: ID }, update)
        res.json('thanh cong')
    } else {
        res.json('sach khong ton tai')
    }
}
export const deleteBook = async (req, res, next) => {
    const { id } = req.body;
    const ID = toUpper(id)
    const data = await bookdb.find({ id: ID })
    if (data[0]) {
        const data1 = await borrowdb.find({ borrower: data[0]._id, status: '1' })
        if (data1[0]) {
            return res.json('sach van dang duoc cho muon')
        }
        await bookdb.remove({ id: ID });
        res.json('thanh cong')
    } else {
        res.json('tai khoan khong ton tai')
    }
}
export const getBook = async (req, res, next) => {
    const { id, status, name } = req.query
    const ID = toUpper(id)
    const $regex = (name) ? escapeStringRegexp(name) : ''
    const a = (ID) ? { status: 'active', ...req.query, id: ID } : { status: 'active', ...req.query }
    const b = (name) ? { ...a, name: { $regex, $options: 'i' } } : { ...a }
    const data = await bookdb.find(b).populate([{ path: 'author', select: 'name' }, { path: 'category', select: 'name' }])
    if (data[0]) {
        let c = []
        for (let i in data) {
            const databook = {
                id: data[i].id,
                name: data[i].name,
            }
            if (data[i].category) {
                let b = [];
                for (let k in data[i].category) {
                    b.push(data[i].category[k].name);
                }
                databook.category = b;
            }
            if (data[i].author) {
                let a = [];
                for (let j in data[i].author) {
                    a.push(data[i].author[j].name);
                }
                databook.author = a;
            }
            if (data[i].publishingyear) {
                databook.publishingyear = data[i].publishingyear
            }
            if (data[i].description) {
                databook.description = ata[i].description
            }
            c.push(databook)
        }
        res.json(c)
    } else {
        res.json('khong co danh sach nhu yeu cau')
    }
}
export const getListBy = async (req, res, next) => {
    const { category, author } = req.query
    if (category) {
        const $regex = escapeStringRegexp(category)
        const query = await categorydb.find({ name: { $regex, $options: 'i' } })
        if (query[0]) {
            for (let index in query) {
                const data = await bookdb.find({ category: query[index]._id }).populate([{ path: 'author', select: 'name' }, { path: 'category', select: 'name' }])
                let c = []
                for (let i in data) {
                    const databook = {
                        id: data[i].id,
                        name: data[i].name,
                    }
                    if (data[i].category) {
                        let b = [];
                        for (let k in data[i].category) {
                            b.push(data[i].category[k].name);
                        }
                        databook.category = b;
                    }
                    if (data[i].author) {
                        let a = [];
                        for (let j in data[i].author) {
                            a.push(data[i].author[j].name);
                        }
                        databook.author = a;
                    }
                    if (data[i].publishingyear) {
                        databook.publishingyear = data[i].publishingyear
                    }
                    if (data[i].description) {
                        databook.description = ata[i].description
                    }
                    c.push(databook)
                }
                res.json(c)
            }
        } else {
            res.json('khong ton tai the loai')
        }
    }
    if (author) {
        const $regex = escapeStringRegexp(author)
        const query = await authordb.find({ name: { $regex, $options: 'i' } })
        if (query[0]) {
            for (let index in query) {
                const data = await bookdb.find({ author: query[index]._id }).populate([{ path: 'author', select: 'name' }, { path: 'category', select: 'name' }])
                let c = []
                for (let i in data) {
                    const databook = {
                        id: data[i].id,
                        name: data[i].name,
                    }
                    if (data[i].category) {
                        let b = [];
                        for (let k in data[i].category) {
                            b.push(data[i].category[k].name);
                        }
                        databook.category = b;
                    }
                    if (data[i].author) {
                        let a = [];
                        for (let j in data[i].author) {
                            a.push(data[i].author[j].name);
                        }
                        databook.author = a;
                    }
                    if (data[i].publishingyear) {
                        databook.publishingyear = data[i].publishingyear
                    }
                    if (data[i].description) {
                        databook.description = ata[i].description
                    }
                    c.push(databook)
                }
                res.json(c)
            }
        } else {
            res.json('khong ton tai the loai')
        }
    }
}

