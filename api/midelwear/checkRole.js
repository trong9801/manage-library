import { ac } from './assignRole'
import { endsWith } from 'lodash'

export const checkRoleManage = async (req, res, next) => {
    const permission = await ac.can(req.userData.role).execute('all').on('user')
    if (permission.granted) {
        next()
    } else {
        return res.json('khong duoc cap quyen')
    }
}
export const checkRoleStaff = async (req, res, next) => {
    await ac.extendRole('manage', 'staff')
    const permission = await ac.can(req.userData.role).execute('all').on('notUser')
    if (permission.granted) {
        next()
    } else {
        return res.json('khong duoc cap quyen')
    }
}
export const checkRoleUser = async (req, res, next) => {
    await ac.extendRole('staff', 'user')
    await ac.extendRole('manage', 'user')
    const permission = await ac.can(req.userData.role).execute('list').on('book,borrow')
    if (permission.granted) {
        next()
    } else {
        return res.json('khong duoc cap quyen')
    }
}