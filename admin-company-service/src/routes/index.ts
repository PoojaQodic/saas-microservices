/**
 * This file has all the routes of the project
 */
import express from 'express'
import authRoutes from './authRoute'
import userRoutes from './userRoute'
import companyRoutes from './companyRoute'

const route = express.Router()

//auth module
route.use('/auth/',authRoutes)

//user module
route.use('/user/',userRoutes)

//company module 
route.use('/company/',companyRoutes)

export default route