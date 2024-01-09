import express from 'express'
import type { RequestHandler } from 'express'

/**
 * Register user API
 *
 * @param {Object} req Request object containing request payload
 * @param {Object} res Response object containing Response of the API
 */
const register: RequestHandler = async (req, res) => {
  // Fetch name , email & password from request
  // const { name, email, password } = req.body
  console.log('Current user')
  res.send('Hi there !!!')
}

/**
 * User login
 *
 * @param {Object} req Request object containing request payload
 * @param {Object} res Response object containing Response of the API
 * @param {Object} next next is used for any next validations
 */
const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body
  console.log('LoggedIn user')
  res.send('Hi LoggedIn user !!!')
}

const logout: RequestHandler = async (req, res) => {
  res.send('user updated')
}

const health: RequestHandler = async (req, res) => {
  res.send('Good health !!!!!!!!!!')
}

export { register, login, logout, health }
