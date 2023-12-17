import jwt from 'jsonwebtoken'

export default function isJWT(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}