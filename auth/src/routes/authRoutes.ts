import express from 'express'
import { register, login, logout, health } from '../controllers/authController'
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware'

const router = express.Router()

router.route('/signup').post(validateRegisterInput, register)
router.route('/signin').post(validateLoginInput, login)
router.route('/logout').patch(logout)
router.route('/health-check').get(health)

export default router
