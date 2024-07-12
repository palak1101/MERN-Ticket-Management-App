import express from "express"
import ticketRoutes from "./router/ticketRoutes.js"
import userRoutes from "./router/userRoutes.js"
import feedbackRoutes from "./router/feedbackRoutes.js"
import connectDB from "./config/dbConfig.js"
import errorHandler from "./middleware/errorMiddleware.js"

import cors from 'cors'

const app = express()

app.use(cors())
connectDB()
app.use(express.json()) //configuring middleware 
//app.use(express.urlencoded({extended:false}))
app.use('/api/tickets',ticketRoutes)
app.use('/api/users',userRoutes)
app.use('/api/feedbacks', feedbackRoutes)
app.use(errorHandler)

app.listen(5000,()=>console.log('server started'))