import mongoose from 'mongoose'
import moment from 'moment'
import { borrowdb } from '../models/borrow'
import { userdb } from '../models/user'
import { bookdb } from '../models/book'
import { checkUser, checkAmount } from '../validate/checkBorrow'
import { toUpper, endsWith } from 'lodash'

export const add = async (req, res, next) => {
    try {
        const { id, book, borrower } = req.body;
        const ID = toUpper(id)
        const BOOK = toUpper(book)
        const BORROWER = toUpper(borrower)
        const data = await borrowdb.find({ id: ID })
        if (data[0]) {
            res.json('ma muon sach da ton tai')
        } else {
            await checkAmount(BOOK)
            await checkUser(BORROWER)
            const newBorrow = {
                _id: new mongoose.Types.ObjectId(),
                ...req.body,
                id: ID,
                createBy: req.userData.id
            }
            const data1 = await userdb.find({ id: BORROWER })
            const data2 = await bookdb.find({ id: BOOK })
            newBorrow.borrower = data1[0]._id
            newBorrow.book = data2[0]._id
            await borrowdb.create(newBorrow)
            res.json('thanh cong')
        }
    } catch (err) {
        res.json(err + '')
    }
}
export const update = async (req, res, next) => {
    const { id, book, borrower, status } = req.body
    const ID = toUpper(id)
    const BOOK = toUpper(book)
    const BORROWER = toUpper(borrower)
    const data = await borrowdb.find({ id: ID })
    if (data[0]) {
        const borrow = {
            ...req.body,
            id: ID
        }
        if (BORROWER) {
            await checkUser(BORROWER)
            const data1 = await userdb.find({ id: BORROWER })
            borrow.borrower = data1[0]._id
        }
        if (BOOK) {
            await checkAmount(BOOK)
            const data2 = await bookdb.find({ id: BOOK })
            borrow.book = data2[0]._id
        }
        await borrowdb.updateOne({ id: ID }, borrow)
        res.json('thanh cong')
    } else {
        res.json('ma muon sach khong ton tai')
    }
}
export const deleteBorrow = async (req, res, next) => {
    const { id } = req.body
    const ID = toUpper(id)
    const data = await borrowdb.find({ id: ID })
    if (data[0]) {
        if (data[0].status = '1') {
            res.json('sach muon van chua duoc tra')
            end()
        }
        await borrowdb.remove({ id: ID })
        res.json('thanh cong')
    } else {
        res.json('ma muon khong ton tai')
    }
}
export const getListborrow = async (req, res, next) => {
    const data = await borrowdb.find({ status: '1' }).populate([{ path: 'borrower', select: 'name , id' }, { path: 'book', select: 'name' }])
    const c = []
    for (let i in data) {
        const borrow = {
            id: data[i].id,
            book: {
                name: data[i].book.name
            },
            borrower: {
                name: data[i].borrower.name,
                id: data[i].borrower.id
            },
            amount: data[i].amount,
            createBy: data[i].createBy
        }
        borrow.borrowDate = moment(data[i].borrowDate).format('dddd, DD-MM-YYYY')
        borrow.payDay = moment(data[i].borrowDate).add(data[i].payDay, 'd').format('dddd, DD-MM-YYYY')
        c.push(borrow)
    }
    res.json(c)
}
export const getByborrower = async (req, res, next) => {
    const ID = toUpper(req.query.borrower)
    const data1 = await userdb.find({ id: ID })
    const data2 = await borrowdb.find({ borrower: data1[0]._id }).populate([{ path: 'borrower', select: 'name , id' }, { path: 'book', select: 'name' }])
    if (data2[0]) {
        const c = []
        for (let i in data2) {
            const borrow = {
                id: data2[i].id,
                book: {
                    name: data2[i].book.name
                },
                borrower: {
                    name: data2[i].borrower.name,
                    id: data2[i].borrower.id
                },
                amount: data2[i].amount,
            }
            borrow.borrowDate = moment(data2[i].borrowDate).format('dddd, DD-MM-YYYY')
            borrow.payDay = moment(data2[i].borrowDate).add(data2[i].payDay, 'd').format('dddd, DD-MM-YYYY')
            c.push(borrow)
        }
        res.json(c)
    } else {
        res.json('nhap id')
    }
}