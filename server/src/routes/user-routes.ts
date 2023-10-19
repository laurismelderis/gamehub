import { Elysia, t } from 'elysia'
import { password as ps } from 'bun'
import User from '../models/User'

const userRoutes = new Elysia()

userRoutes
  .get('/', async ({ set }) => {
    try {
      const users = await User.find()
      set.status = 200
      return users
    } catch (error) {
      set.status = 500
      return error
    }
  })
  .guard(
    {
      body: t.Object({
        username: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    },
    (app) =>
      app.post(
        '/register',
        async ({ body, set }) => {
          try {
            const { name, email, password } = body
            const hashedPassword = await ps.hash(password)
            const user = new User({ name, email, password: hashedPassword })
            await user.save()
            set.status = 200
            return `User registerd with id ${user._id}`
          } catch (error) {
            set.status = 500
            return error
          }
        },
        {
          body: t.Object({
            name: t.String(),
            email: t.String(),
            password: t.String(),
          }),
          beforeHandle: ({ body }) => {
            // Validate the request body
            // console.log('before handle')
          },
        }
      )
  )

export default userRoutes
