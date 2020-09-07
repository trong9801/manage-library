import mongoose from 'mongoose';
import { userdb } from '../models/user'
import { borrowdb } from '../models/borrow'
import { hash } from '../validate/hash'
import { checkName, checkPass, checkId } from '../validate/checkUser'
import { toUpper, endsWith } from 'lodash';


// thêm mới tài khoản
export const add = async (req, res, next) => {
    const { id, password, name, role, status, birthyear } = req.body;
    const ID = toUpper(id)
    try {
        checkId(id)
        const data = await userdb.find({ id: ID });
        if (data[0]) {
            throw ('tai khoan da ton tai');
        } else {
            checkName(name)
            checkPass(password)
            const hashPassword = await hash(password);
            const newUser = {
                _id: new mongoose.Types.ObjectId(),
                ...req.body,
                id: ID,
                passWord: hashPassword
            };
            // console.log(newUser)
            await userdb.create(newUser)
            res.json('thanh cong')
        }
    } catch (err) {
        res.json(err)
    }
}

//sửa các thông tin: mật khẩu, tên, quyền, trạng thái
export const updateInfor = async (req, res, next) => {
    const { id, name, role, status } = req.body;
    const ID = toUpper(id)
    const data = await userdb.find({ id: ID });
    if (data[0]) {
        try {
            if (name) {
                checkName(name)
            }
            const udUser = {
                ...req.body,
                id: ID,
                passWord: data[0].passWord
            };
            // console.log(udUser)
            await userdb.updateOne({ id: ID }, udUser)
            res.json('thanh cong')
        } catch (err) {
            res.json(err + '')
        }
    } else {
        res.json('tai khoan khong ton tai')
    }
}
//Dổi mật khẩu
export const updatePass = async (req, res, next) => {
    const { id, password } = req.body;
    const ID = toUpper(id)
    const data = await userdb.find({ id: ID });
    if (data[0]) {
        try {
            checkPass(password)
            const hashPassword = await hash(password);
            await userdb.updateOne({ id: ID }, { passWord: hashPassword })
            res.json('thanh cong!')
        } catch (err) {
            res.json(err + '')
        }
    } else {
        res.json('tai khoan khong ton tai')
    }
}
//Xóa tài khoản
export const deleteUser = async (req, res, next) => {
    const { id } = req.body;
    const ID = toUpper(id)
    const data = await userdb.find({ id: ID })
    if (data[0]) {
        const data1 = await borrowdb.find({ borrower: data[0]._id, status: '1' })
        if (data1[0]) {
            return res.json('tai khoan van dang co sach chua tra')
        }
        await userdb.remove({ id: ID });
        res.json('thanh cong')
    } else {
        res.json('tai khoan khong ton tai')
    }
}

//Danh sách các tài khoản với trạng thái, chi tiết, quyền của tài khoản 
export const getListuser = async (req, res) => {
    const { status, id, role } = req.query
    const ID = toUpper(id)
    const a = (ID)? {status: 'active', ...req.query, id:ID} : {status: 'active', ...req.query}
    console.log(a)
    const data = await userdb.find(a, { passWord: 0, _id: 0 })
    res.json(data[0] ? data : `không có tài khoản ở trạng thái cần tìm`)
}
