const User = require('../models/User')

const jwt = require('jsonwebtoken')

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

const handleRefreshToken = async (req: any, res: any) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt

  const user = await User.findOne({ refreshToken })
  if (!user) return res.sendStatus(403) //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
    if (err || user.email !== decoded.email) return res.sendStatus(403)
    const roles = Object.values(user.roles)
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    )
    res.json({ accessToken })
  })
}

module.exports = { handleRefreshToken }
