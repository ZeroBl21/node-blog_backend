import { randomUUID } from 'node:crypto'

import multer from 'multer'

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

const uploadImage = multer({ storage: fileStorage, fileFilter })

export default uploadImage
