import { body, param, validationResult } from 'express-validator'
import {
  JOB_STATUS,
  JOB_TYPE,
  VALIDATION_MESSAGES,
  USER_TYPE,
} from '../utils/constants'
import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} from '../errors/customErrors'
import { Request } from 'express-validator/src/base'
// import mongoose from 'mongoose'
// import Job from '../models/JobModel.js'
// import User from '../models/UserModel.js'

const withValidationErrors = (validateValues: any) => {
  return [
    validateValues,
    (req: Request, res: Response, next: () => void) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)
        console.log(errorMessages)
        const firstMessage = errorMessages[0]

        if (errorMessages[0].startsWith(VALIDATION_MESSAGES.EMAIL_REQ)) {
          throw new NotFoundError(firstMessage)
        }
        if (errorMessages[0].startsWith(VALIDATION_MESSAGES.NOT_AUTHORIZED)) {
          throw new UnauthorizedError(VALIDATION_MESSAGES.ROUTE_NOT_AUTH)
        }
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage(VALIDATION_MESSAGES.NAME_REQ),
  body('email')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.EMAIL_REQ)
    .isEmail()
    .withMessage(VALIDATION_MESSAGES.EMAIL_INVALID),

  body('password')
    .trim()
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.PASSWORD_REQ)
    .isLength({ min: 8, max: 10 })
    .withMessage(VALIDATION_MESSAGES.PASSWORD_LENGTH),
])

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.EMAIL_REQ)
    .isEmail()
    .withMessage(VALIDATION_MESSAGES.EMAIL_INVALID),
  body('password')
    .trim()
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.PASSWORD_REQ)
    .isLength({ min: 8, max: 10 })
    .withMessage(VALIDATION_MESSAGES.PASSWORD_LENGTH),
])

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    // const isValidMongoId = mongoose.Types.ObjectId.isValid(value)
    // if (!isValidMongoId) {
    //   // throw new BadRequestError(VALIDATION_MESSAGES.MONGO_ID_INVALID)
    // }

    // const job = await Job.findById(value)
    // if (!job) throw new NotFoundError(`no job with id ${value}`)
    const isAdmin = req.user.role === USER_TYPE.ADMIN
    // const isOwner = req.user.userId === job.createdBy.toString()

    if (!isAdmin) {
      // throw new UnauthorizedError(VALIDATION_MESSAGES.ROUTE_NOT_AUTH)
    }
  }),
])

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage(VALIDATION_MESSAGES.EMAIL_EXISTS),
  body('email')
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.EMAIL_REQ)
    .isEmail()
    .withMessage(VALIDATION_MESSAGES.EMAIL_INVALID),
  // .custom(async (email, { req }) => {
  //   const user = await User.findOne({ email })
  //   if (user && user._id.toString() !== req.user.userId) {
  //     throw new BadRequestError(VALIDATION_MESSAGES.EMAIL_EXISTS)
  //   }
  // }),

  body('location').notEmpty().withMessage(VALIDATION_MESSAGES.EMAIL_EXISTS),
  body('lastName').notEmpty().withMessage(VALIDATION_MESSAGES.EMAIL_EXISTS),
])
