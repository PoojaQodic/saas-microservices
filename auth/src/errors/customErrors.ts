import { StatusCodes } from 'http-status-codes'
import { ERROR_NAMES } from '../utils/constants'

export class NotFoundError extends Error {
  statusCode: StatusCodes
  constructor(message: string | undefined) {
    super(message)
    this.name = ERROR_NAMES.NOT_FOUND
    this.statusCode = StatusCodes.NOT_FOUND
  }
}
export class BadRequestError extends Error {
  statusCode: StatusCodes
  constructor(message: string | string[] | undefined) {
    super(Array.isArray(message) ? message[0] : message)
    this.name = ERROR_NAMES.BAD_REQUEST
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
export class UnauthenticatedError extends Error {
  statusCode: StatusCodes
  constructor(message: string | undefined) {
    super(message)
    this.name = ERROR_NAMES.UNAUTHENTICATED
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}
export class UnauthorizedError extends Error {
  statusCode: StatusCodes
  constructor(message: string | undefined) {
    super(message)
    this.name = ERROR_NAMES.UNAUTHORIZED
    this.statusCode = StatusCodes.FORBIDDEN
  }
}
