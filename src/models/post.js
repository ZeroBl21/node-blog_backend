import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title must be provided'],
      min: 1
    },
    summary: {
      type: String,
      required: [true, 'summary must be provided'],
      min: 1
    },
    content: {
      type: String,
      required: [true, 'content must be provided'],
      min: 1
    },
    cover: {
      type: String,
      required: [true, 'cover image must be provided'],
      min: 1
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'the user must be provided']
    }
  },
  { timestamps: true }
)

export default mongoose.model('Post', postSchema)
