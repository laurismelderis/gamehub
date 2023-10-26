import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as IconLogo } from '../assets/GameHubLogo.svg'

const Logo = () => (
  <Link to="/">
    <IconLogo style={{ margin: '0.5em' }} />
  </Link>
)

export default Logo
