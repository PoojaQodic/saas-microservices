import express from 'express';
import authController from '../controllers/authController'

const route=express.Router()

//for login into system
route.get('/login',authController.login)

//This API will set the password
route.patch('/set-password',authController.setPassword)

export default route
