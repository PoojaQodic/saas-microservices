import { StatusCodes } from 'http-status-codes'
import { VALIDATION_MESSAGES } from '../utils/constants'
import { Request, Response, NextFunction } from 'express'
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customErrors'

const errorHandlerMiddleware = (
  err:
    | NotFoundError
    | BadRequestError
    | UnauthenticatedError
    | UnauthorizedError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err)
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

  const msg = err.message || VALIDATION_MESSAGES.SOMETHING_WENT_WRONG

  res.status(statusCode).json({ msg })
}

export default errorHandlerMiddleware
