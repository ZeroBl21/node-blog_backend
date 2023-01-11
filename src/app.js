import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectDB from './db/connect.js'
import errorHandler from './middleware/error-handler.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const PORT = process.env.PORT || 4000

const app = express()

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)
app.use(express.json())
app.use(cookieParser())

app.use(authRoutes)

app.post('/test', (req, res) => {
  res.send({ status: 'OK', port: PORT })
})

app.use(errorHandler)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server is listening on port :${PORT}...`))
  } catch (error) {
    console.error(error)
  }
}

start()
