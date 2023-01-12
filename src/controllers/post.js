import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import Post from '../models/post.js'
import { handleError } from '../utils/error.js'

dotenv.config()

export const getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1
  const perPage = 5

  try {
    const totalItems = await Post.find().countDocuments()
    const posts = await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage)

    if (!posts) {
      throw handleError(404, 'Error fetching the posts')
    }

    res.status(200).json({
      message: 'Fetched posts successfully',
      posts,
      totalItems
    })
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req, res, next) => {
  if (!req.file) {
    throw handleError(422, 'No image provided.')
  }
  const { title, summary, content } = req.body
  const { token } = req.cookies

  try {
    const user = await jwt.verify(token, process.env.SECRET_CODE)

    const post = await Post.create({
      title,
      summary,
      content,
      cover: req.file.path,
      author: user.userId
    })

    res.status(201).json({ message: 'Post has been created', post })
  } catch (error) {
    next(error)
  }
}
