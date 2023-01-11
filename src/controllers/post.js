import Post from '../models/post.js'
import { handleError } from '../utils/error.js'

export const createPost = async (req, res, next) => {
  if (!req.file) {
    throw handleError(422, 'No image provided.')
  }

  const { title, summary, content } = req.body

  try {
    const post = await Post.create({
      title,
      summary,
      content,
      cover: req.file.path
    })

    res.status(201).json({ message: 'Post has been created', post })
  } catch (error) {
    next(error)
  }
}
