import mongoose from 'mongoose'
import { IChat, chatSchema } from './Chat'

export interface IUser {
  name: string
  email: string
  password: string
  role: string
  chats: Array<IChat>
}

export const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Guest',
  },
  chats: [chatSchema],
})

export default mongoose.model('User', userSchema)
