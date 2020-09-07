import express from 'express';
import { signup, signin } from '../controler/login';
import { check_auth } from '../midelwear/chech_auth';
import { add, updateInfor, updatePass, deleteUser, getListuser } from '../controler/user'
import {checkRoleManage} from '../midelwear/checkRole'

const router = express.Router();

// router.post('/signup', signup);
router.post('/sigin', signin);
router.post('/add', check_auth, checkRoleManage, add);
router.post('/updateInfor', check_auth, checkRoleManage, updateInfor);
router.post('/updatePass', check_auth, checkRoleManage, updatePass);
router.delete('/deleteUser', check_auth, checkRoleManage, deleteUser);
router.get('/list',check_auth, checkRoleManage, getListuser);



export const userRt = router;
