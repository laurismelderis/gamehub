import { Elysia } from 'elysia'
import User from '../models/User'
import jwt from '@elysiajs/jwt'

export const isAuthenticated = (app: Elysia) =>
  app
    .use(
      jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET as string,
      })
    )
    .derive(async ({ cookie, jwt, set }) => {
      if (!cookie!.access_token) {
        set.status = 401
        return {
          message: 'Unauthorized',
          status: 401,
        }
      }
      const { userId }: any = await jwt.verify(cookie!.access_token.toString())
      if (!userId) {
        set.status = 401
        return {
          message: 'Unauthorized',
          status: 401,
        }
      }

      const user = await User.findOne({
        _id: userId,
      })
      if (!user) {
        set.status = 401
        return {
          message: 'Unauthorized',
          status: 401,
        }
      }

      set.status = 200
      return {
        message: user,
        status: 200,
      }
    })
