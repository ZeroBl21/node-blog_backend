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

    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET_CODE,
      {
        expiresIn: '1h'
      }
    )

    res.cookie('token', token).json({
      message: 'User login successful',
      user: { userId: user._id, username: user.username }
    })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    res.cookie('token', '').json({ message: 'User logout successful' })
  } catch (error) {
    next(error)
  }
}

export const profile = async (req, res, next) => {
  const { token } = req.cookies
  console.log(token)

  try {
    const info = await jwt.verify(token, process.env.SECRET_CODE)

    res.status(200).json(info)
  } catch (error) {
    res.status(404).json({ message: 'User is not login' })
  }
}
