import express from 'express'
import { json } from 'body-parser'
import authRoute from './routes/authRoutes'
import { MESSAGES } from './utils/constants'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware'

const app = express()

app.use(express.json())

// Authenticate route
app.use('/api/users/', authRoute)

app.use('*', (req, res) => {
  res.status(404).json({ msg: MESSAGES.NOT_FOUND })
})

app.use(errorHandlerMiddleware)

app.listen(3000, () => {
  console.log('Auth service : 3000 ')
})
