import express from 'express'
import adminApi from '../controller/adminController.js'
//step 4
const router = express.Router()

const {loginAdmin} = adminApi


router.post('/admin-login',loginAdmin)

export default router