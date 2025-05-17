import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js';


export const authHandler = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            let decode = jwt.verify(token, process.env.JWT_SECRET);

            let user = await User.findById(decode.id)
            req.user = user
            next()


        } catch (error) {
            res.status(401)
            throw new Error('Invalid Token')
        }
    } else {
        res.status(401)
        throw new Error('Token not present')
    }
}