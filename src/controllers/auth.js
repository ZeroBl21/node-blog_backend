import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { handleError } from '../utils/error.js'
import User from '../models/user.js'

dotenv.config()

export const register = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
      username,
      password: hashedPassword
    })

    res.status(201).json({ message: 'User has been created', userId: user._id })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      throw handleError(401, 'Invalid username or password')
    }

    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      throw handleError(401, 'Invalid username or password')
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_CODE, {
      expiresIn: '1h'
    })

    res.cookie('token', token).json({ message: 'User login successful' })
  } catch (error) {
    next(error)
  }
}
