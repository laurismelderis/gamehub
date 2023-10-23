import { randomUUID } from 'crypto'
import mongoose from 'mongoose'

export interface IChat {
  id: string
  role: string
  content: string
}

export const chatSchema = new mongoose.Schema<IChat>({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

export default mongoose.model('Chat', chatSchema)
