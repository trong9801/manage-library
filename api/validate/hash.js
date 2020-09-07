import bcrypt from 'bcryptjs'

export const hash = async (pass) => {
    const saltRounds = process.env.saltRounds || 10;
    const b = await bcrypt.hash(pass, saltRounds)
        return b;
}