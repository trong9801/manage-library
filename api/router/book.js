import express from 'express'
import {add, getBook, update, deleteBook, getListBy} from '../controler/book'
import{ checkRoleUser, checkRoleStaff} from '../midelwear/checkRole'
import { check_auth } from '../midelwear/chech_auth';
const router = express.Router();

router.post('/add', check_auth, checkRoleStaff, add)
router.post('/update', check_auth, checkRoleStaff, update)
router.delete('/delete', check_auth, checkRoleStaff, deleteBook)
router.get('/list', check_auth,checkRoleUser, getBook)
router.get('/listBy', check_auth, checkRoleUser, getListBy)


export const bookRt = router;