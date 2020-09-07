import jwt from 'jsonwebtoken'
import { endsWith } from 'lodash';

export const check_auth = (req, res, next)=>{
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_key);
        req.userData = decoded;
        next();
    } catch (error) {
       return res.json('xac thuc that bai');
      
    }
}