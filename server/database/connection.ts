import { connect, disconnect } from 'mongoose'
export async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL || '')
  } catch (error) {
    console.log(error)
    throw new Error('Failed to connect to MongoDB')
  }
}

export async function disconnectFromDatabase() {
  try {
    await disconnect()
  } catch (error) {
    throw new Error('Failed to disconnect from MongoDB.')
  }
}
