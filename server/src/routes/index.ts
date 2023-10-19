import { Elysia } from 'elysia'
import userRoutes from './user-routes'
import chatRoutes from './chat-routes'
import { usersController } from '../controllers/usersController'

const appRouter = new Elysia()

appRouter.group('/api', (app: Elysia<'/api'>) =>
  app
    .use(usersController)
    .group('/user', (app) => app.use(userRoutes))
    .group('/chats', (app) => app.use(chatRoutes))
)

export default appRouter
