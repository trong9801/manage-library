import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userdb } from '../models/user'
import { hash } from '../validate/hash'
import { checkName, checkPass } from '../validate/checkUser'
import { toUpper } from 'lodash';


//Đăng ký tài khoản
// export const signup = async (req, res) => {
//     const { id, password, name } = req.body;
//     const ID = toUpper(id)
//     const data = await userdb.find({id: ID});
//     if (data[0]) {
//         res.json('tai khoan da ton tai');
//     } else {
//         try {
//             checkName(name)
//             checkPass(password)
//             const hashPassword = await hash(password);
//             const newUser = {
//                 _id: new mongoose.Types.ObjectId(),
//                 ...req.body,
//                 id: ID,
//                 passWord: hashPassword
//             };
//             await userdb.create(newUser)
//             res.json('thanh cong')
//         } catch (err) {
//             res.json(err + '')
//         }
//     }
// }
export const signin = async (req, res, next) => {
    // console.log('a')
    const { id, password } = req.body;
    const ID = toUpper(id)
    const data = await userdb.find({ id: ID});
   if(data[0]){
    if (bcrypt.compareSync(password, data[0].passWord) & data[0].status == 'active') {
        const token = jwt.sign(
            {
                id: data[0].id,
                role: data[0].role
            },
            process.env.JWT_key,
            {
                expiresIn: "1h"
            }
        );
        res.json({ token: token })
    } else {
        res.json('mat khau sai')
    }
   }else(
       res.json('tai khoan khong ton tai')
   )
}