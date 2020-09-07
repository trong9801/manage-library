import express from 'express';
import {add, update, deleteAuthor, getListAuthor} from '../controler/author'
import {checkRoleStaff, checkRoleUser} from '../midelwear/checkRole'
import { check_auth } from '../midelwear/chech_auth';

const router = express.Router();

router.post('/add', check_auth, checkRoleStaff, add);
router.post('/update', check_auth, checkRoleStaff, update);
router.delete('/delete', check_auth, checkRoleStaff, deleteAuthor);
router.get('/getListAuthor', check_auth, checkRoleUser, getListAuthor)

export const authorRt = router;
