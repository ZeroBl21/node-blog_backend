import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username must be provided'],
      min: [4, 'username must be at least 4 characters long'],
      unique: [true, 'username is already in use'],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'password must be provided']
    }
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
