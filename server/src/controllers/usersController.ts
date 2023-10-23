import { Elysia, t } from 'elysia'
import User, { IUser } from '../models/User'
import { jwt } from '@elysiajs/jwt'
import { password as ps } from 'bun'
import cookie from '@elysiajs/cookie'
import { isAuthenticated } from '../middlewares/auth'

const cookie_token_age = 15 * 60 // 15 minutes

export const usersController = (app: Elysia) =>
  app.group('/users', (app: Elysia<'/users'>) =>
    app
      .use(
        jwt({
          name: 'jwt',
          secret: process.env.JWT_SECRET as string,
        })
      )
      .use(
        cookie({
          httpOnly: true,
          secure: true,
        })
      )
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
            async ({ body, set, jwt, setCookie }) => {
              try {
                const { name, email, password } = body
                const hashedPassword = await ps.hash(password)
                const user = new User({
                  name,
                  email,
                  password: hashedPassword,
                })

                await user.save()

                const accessToken = await jwt.sign({
                  userId: user._id.toString(),
                })

                setCookie('access_token', accessToken, {
                  maxAge: cookie_token_age, // 15 minutes
                  path: '/',
                })

                set.headers = {
                  'X-Authorization': accessToken,
                }
                set.status = 201

                return 'OK'
              } catch (error: any) {
                // If unique mongoose constraint (for username or email) is violated
                if (error.name === 'MongoServerError' && error.code === 11000) {
                  set.status = 422
                  return {
                    message: 'Resource already exists!',
                    status: 422,
                  }
                }

                set.status = 500
                return {
                  message: 'Unable to save entry to the database!',
                  status: 500,
                }
              }
            },
            {
              body: t.Object({
                name: t.String(),
                email: t.String(),
                password: t.String(),
              }),
            }
          )
      )
      .post(
        '/login',
        async ({ body, set, jwt, setCookie, cookie }) => {
          const { email, password } = body
          const user = await User.findOne({ email })

          if (!user) {
            set.status = 400
            return {
              message: 'Invalid credentials',
              status: 400,
            }
          }

          const validPassword = await ps.verify(password, user.password)
          if (!validPassword) {
            set.status = 400
            return {
              message: 'Invalid credentials',
              status: 400,
            }
          }

          const accessToken = await jwt.sign({
            userId: user.id,
          })

          setCookie('access_token', accessToken, {
            maxAge: cookie_token_age, // 15 minutes
            path: '/',
          })

          return {
            message: 'Login successful',
            status: 201,
          }
        },
        {
          body: t.Object({
            email: t.String(),
            password: t.String(),
          }),
        }
      )
      .use(isAuthenticated)
      .get('/me', async ({ message, status }) => {
        return {
          message,
          status,
        }
      })
      .get('/', async ({ set, message, status }) => {
        try {
          const users = await User.find({})

          if (status === 401) {
            return {
              message,
              status,
            }
          }

          return users
        } catch (e: unknown) {
          set.status = 500
          return {
            message: 'Unable to retrieve items from the database!',
            status: 500,
          }
        }
      })
      .post('/logout', async ({ setCookie, status, message }) => {
        if (status === 401) {
          return {
            message,
            status,
          }
        }
        setCookie('access_token', '')

        return {
          message: 'Logged out successfully',
          status: 200,
        }
      })
      .get('/:id', async ({ params, set, message, status }) => {
        try {
          const { id } = params

          const existingUser = await User.findById(id)

          if (!existingUser) {
            set.status = 404
            return {
              message: 'Requested resource was not found!',
              status: 404,
            }
          }

          return {
            message,
            status,
          }
        } catch (e: unknown) {
          set.status = 500
          return {
            message: 'Unable to retrieve the resource!',
            status: 500,
          }
        }
      })
      .patch('/:id', async ({ params, body, set, status, message }) => {
        try {
          const theMessage: IUser = message as IUser
          if (status === 401) return { message, status }
          if (theMessage.role !== 'Admin') return { message, status: '403' }

          const { id } = params

          const changes = body

          const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: { ...changes } },
            { new: true }
          )

          if (!updatedUser) {
            set.status = 404
            return {
              message: `User with id: ${id} was not found.`,
              status: 404,
            }
          }

          return updatedUser
        } catch (e: unknown) {
          set.status = 500
          return {
            message: 'Unable to update resource!',
            status: 500,
          }
        }
      })
      .delete('/:id', async ({ params, set, message, status }) => {
        try {
          if (status === 401) return { message, status }

          const { id } = params

          const existingUser = await User.findById(id)

          if (!existingUser) {
            set.status = 404
            return {
              message: `User with id: ${id} was not found.`,
              status: 404,
            }
          }

          await User.findOneAndRemove({ _id: id })

          return {
            message: `Resource deleted successfully!`,
            status: 200,
          }
        } catch (e: unknown) {
          set.status = 500
          return {
            message: 'Unable to delete resource!',
            status: 500,
          }
        }
      })
  )
