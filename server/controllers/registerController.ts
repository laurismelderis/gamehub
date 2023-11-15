import ps from 'bun'
const User = require('../models/User')

const handleNewUser = async (req: any, res: any) => {
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: 'Name or email or password are missing.' })

  try {
    const hashedPassword = await ps.hash(password)
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    res.status(201).json({ success: `New user ${user} created!` })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { handleNewUser }
