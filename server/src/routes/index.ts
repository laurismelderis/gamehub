import { Elysia } from 'elysia'
import chatRoutes from './chat-routes'
import { usersController } from '../controllers/usersController'

const appRouter = new Elysia()

appRouter.group('/api', (app: Elysia<'/api'>) =>
  app
    .use(usersController)
    .group('/chats', (app) => app.use(chatRoutes))
)

export default appRouter
