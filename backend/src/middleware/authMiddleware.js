import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';

const secure = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, 'password');

            // Find user by decoded ID (assuming UserModel.findById() returns a Promise resolving to the user document)
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401);
                throw new Error('User not found!');
            }

            // Example: Compare user's password with a request parameter named 'password'
            const { password } = req.body; // Assuming password is sent in request body
            if (!password) {
                res.status(401);
                throw new Error('Password not provided!');
            }

            // Example: Compare hashed passwords
            if (req.user.password !== password) {
                res.status(401);
                throw new Error('Password does not match!');
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized');
    }
});

export default secure;
