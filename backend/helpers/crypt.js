import bcrypt from 'bcrypt'

export function hashPassword(password)
{
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
export function verifyPassword(password,hashed){
    return bcrypt.compareSync(password,hashed);
}