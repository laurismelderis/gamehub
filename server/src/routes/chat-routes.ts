import { Elysia, t } from 'elysia'

const chatRoutes = new Elysia()

// /api/chats
chatRoutes.get('/', () => 'Hello chats routes')

export default chatRoutes
