import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import { helmet } from 'elysia-helmet'
import { connectToDatabase } from './database/connection'
import appRouter from './routes'

const { PORT = 5001 } = process.env

console.log('Connecting to MongoDB ...')
connectToDatabase()
  .then(() => {
    const server = new Elysia()

    server.use(cors())
      .use(helmet())
      .use(swagger({path: '/api/docs'}))
      .use(appRouter)
      .listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
      })
  })
  .catch((err) => console.log(err))