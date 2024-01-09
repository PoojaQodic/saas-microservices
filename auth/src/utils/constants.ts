export const JOB_STATUS = {
  PENDING: 'pending',
  INTERVIEW: 'interview',
  DECLINED: 'declined',
}

export const JOB_TYPE = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  INTERNSHIP: 'internship',
}

export const JOB_SORT_BY = {
  NEWEST_FIRST: 'newest',
  OLDEST_FIRST: 'oldest',
  ASCENDING: 'a-z',
  DESCENDING: 'z-a',
}

export const USER_TYPE = {
  ADMIN: 'admin',
  USER: 'user',
}

export const VALIDATION_MESSAGES = {
  EMAIL_REQ: 'Email is required',
  PASSWORD_REQ: 'Password is required',
  NAME_REQ: 'Name is required',

  INVALID_CREDENTIALS: 'Invalid credentials',
  SOMETHING_WENT_WRONG: 'something went wrong, try again later',

  NOT_AUTHORIZED: 'not authorized',
  ROUTE_NOT_AUTH: 'not authorized to access this route',
  INVALID_AUTH: 'authentication invalid',

  EMAIL_INVALID: 'Invalid email format',

  PASSWORD_LENGTH: 'Password must be at least 8 characters long',
  EMAIL_EXISTS: 'Email already exists',
}

export const DEFAULT_MODELS = {
  JOB_LOCATION: 'my city',
  LAST_NAME: 'lastname',
  USER_TYPE: 'user',
}
export const ENVIRONMENT = {
  DEV: 'development',
  PROD: 'production',
}

export const MESSAGES = {
  RATE_LIMIT: 'IP rate limit exceeded, retry in 15 minutes.',
  DEFAULT_ROOT_URL_MSG: 'Hello World',
  NOT_FOUND: 'not found',
  SERVER_RUNNING_ON: 'Server running on PORT ',
  USER_CREATED: 'user created',
  USER_UPDATED: 'User updated',
  LOGGED_IN: 'user logged in',
  LOGGED_OUT: 'user logged out!',
  JOB_MODIFIED: 'Job modified',
  JOB_DELETED: 'Job deleted',
}

export const ERROR_NAMES = {
  NOT_FOUND: 'NotFoundError',
  BAD_REQUEST: 'BadRequestError',
  UNAUTHENTICATED: 'UnauthenticatedError',
  UNAUTHORIZED: 'UnauthorizedError',
}
