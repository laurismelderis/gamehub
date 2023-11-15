import ps from 'bun'

const jwt = require('jsonwebtoken')
const User = require('../models/User')

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

const handleLogin = async (req: any, res: any) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const user: any = await User.findOne({ email })

  if (!user) return res.sendStatus(401) //Unauthorized

  // evaluate password
  const match = await ps.verify(password, user.password)
  if (match) {
    const roles = Object.values(user.roles)
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: user.email,
          roles: roles,
        },
      },
      ACCESS_TOKEN_SECRET as string,
      { expiresIn: '30s' }
    )
    const refreshToken = jwt.sign(
      { email: user.email },
      REFRESH_TOKEN_SECRET as string,
      { expiresIn: '1d' }
    )

    // Saving refreshToken with current user
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { refreshToken } },
      { new: true }
    )

    if (!updatedUser) return res.sendStatus(404)

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { handleLogin }
