import express from 'express'


import secure from '../middleware/authMiddleware.js'

import productApi from '../controller/ticketController.js'


const router = express.Router()

const {searchTicketById,searchContactByName} = productApi

router.route('/navbar').get(secure,searchTicketById)

export default router