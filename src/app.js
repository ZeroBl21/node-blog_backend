import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectDB from './db/connect.js'
import errorHandler from './middleware/error-handler.js'
import uploadImage from './middleware/upload-image.js'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/post.js'

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
app.use('/uploads', express.static('./uploads'))

// Endpoints

app.use(authRoutes)
app.use(uploadImage.single('file'), postRoutes)

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
