import { isEmpty } from 'lodash'

export const checkName = (name) => {
    if (isEmpty(name)) {
        throw 'nhap ten'
    }
}
export const checkPass = (pass) => {
    if (isEmpty(pass)) {
        throw 'nhap password'
    }
}
export const checkId = (id) => {
    if (isEmpty(id)) {
        throw 'nhap id'
    }
    // if (id.search('AT' && 'at') != 0 && id.search('CT' &&'ct') != 0) {
    //     throw 'id co dang ATxxx hoac CTxxx'
    // }
    // if (id.length <= 2) {
    //     throw 'do dai id phai lon hon 2'
    // }
}