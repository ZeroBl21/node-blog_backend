import { Router } from 'express'

import {
  createPost,
  getPost,
  getPosts,
  updatePost
} from '../controllers/post.js'

const router = Router()

router.get('/post', getPosts)
router.get('/post/:id', getPost)
router.put('/post/:id', updatePost)
router.post('/post', createPost)

export default router
