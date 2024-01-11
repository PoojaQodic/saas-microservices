import express from 'express';
import UserController from '../controllers/userController'
import {authenticateUser } from '../middleware/authMiddleware'

const route=express.Router()

//for login into system
route.post('/',authenticateUser,UserController.createUser)

//for get user by id
route.get('/:id',authenticateUser,UserController.getUserById)

//for get user by id
route.get('/',authenticateUser,UserController.listUser)

//for delete user by id
route.delete('/:id',authenticateUser,UserController.deleteUserById)

//for update user by id
route.patch('/:id',authenticateUser,UserController.updateUser)

export default route
