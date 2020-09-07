import express from 'express'
import{add, getListborrow, getByborrower, update, deleteBorrow} from '../controler/borrow'
import { check_auth } from '../midelwear/chech_auth';
import {checkRoleStaff, checkRoleUser} from '../midelwear/checkRole'


const router = express.Router()

router.post('/add', check_auth, checkRoleStaff, add)
router.post('/update', check_auth, checkRoleStaff, update)
router.delete('/delete', check_auth, checkRoleStaff, deleteBorrow)
router.get('/get', check_auth, checkRoleStaff, getListborrow)
router.get('/getid',check_auth, checkRoleUser,getByborrower)
export const borrowRt = router