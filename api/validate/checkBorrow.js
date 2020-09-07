import mongoose from 'mongoose'
import { userdb } from '../models/user'
import { bookdb } from '../models/book'
import { borrowdb } from '../models/borrow'
import e from 'express'

export const checkAmount = async (mas) => {
    const query1 = await bookdb.find({ id: mas })
    if (!query1[0]) {
        throw 'sach khong ton tai'
    } else {
        const query2 = await borrowdb.find({ book: query1[0]._id, status: 1 })
        console.log(query2)
        const amountS = parseInt(query1[0].amount)
        const amountBr = query2.length
        if (amountBr >= amountS) {
            throw 'sach da duoc cho muon het'
        }
    }
}
export const checkUser = async (masv) => {
    const query = await userdb.find({ id: masv })
    if (!query[0]) {
        throw 'tai khoan khong ton tai'
    }
    if (query[0].status == 'none') {
        throw 'tai khoan da bi khoa'
    }
}