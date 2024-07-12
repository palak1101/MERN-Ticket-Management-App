import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Admin from '../model/adminModel.js'

//checks if a token is there and if it is valid or not
const secure = asyncHandler(async(req,res,next) => {
    let token
    let adminPassword
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try{
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token,'password')
            req.admin = await Admin.findById(decoded.id).select('-password')
            if(!req.admin){
                res.status(401)
                throw new Error ('Admin not found!')
            }
            if (adminPassword !== Admin.password) {
                res.status(401);
                throw new Error('Password does not match!');
            }
            req.admin = Admin;
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error ('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error ('Not authorized')
    }
})
export default secure