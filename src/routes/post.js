import { Router } from 'express'

import { createPost, getPosts } from '../controllers/post.js'

const router = Router()

router.get('/post', getPosts)
router.post('/post', createPost)

export default router
