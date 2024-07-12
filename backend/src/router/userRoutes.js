import express from 'express'
import secure from '../middleware/authMiddleware.js'
import userAPI from "../controller/userController.js"

const router = express.Router()

const {getAllUsers, getUser, updateUser,registerUser,loginUser, changePassword} = userAPI

router.route('/').get(secure, getAllUsers)
router.route('/:id').get(getUser)
router.route('/:id/update').put(updateUser)
router.post('/login',loginUser);
router.route('/').get(secure,getAllUsers)
router.route('/:id/changePassword').put(changePassword)
router.route('/').post(registerUser)

export default router