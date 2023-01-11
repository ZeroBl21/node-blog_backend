import { randomUUID } from 'node:crypto'

import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'

import connectDB from './db/connect.js'
import errorHandler from './middleware/error-handler.js'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/post.js'

dotenv.config()

const PORT = process.env.PORT || 4000

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${randomUUID()}-${file.originalname}`)
  }
})

const fileFilter = (_req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/avif'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const app = express()

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(multer({ storage: fileStorage, fileFilter }).single('file'))
app.use('/uploads', express.static('./uploads'))

// Endpoints

app.use(authRoutes)
app.use(postRoutes)

app.post('/test', (_req, res) => {
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
