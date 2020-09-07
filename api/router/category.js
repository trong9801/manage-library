import express, { Router } from 'express'
import { check_auth } from '../midelwear/chech_auth';
import {checkRoleStaff} from '../midelwear/checkRole'
import {add, update, deleteCategory, getListCategory} from '../controler/category'
 const router = express.Router();

 router.post('/add',check_auth, checkRoleStaff, add)
 router.post('/update',check_auth, checkRoleStaff, update)
 router.delete('/add', check_auth, checkRoleStaff, deleteCategory)
 router.get('/getListCategory', check_auth, checkRoleStaff, getListCategory)

 export const categoryRt = router;