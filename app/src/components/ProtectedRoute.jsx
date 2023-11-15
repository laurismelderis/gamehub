import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode' // eslint-disable-line

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkUserToken = () => {
    const accessToken = localStorage.getItem('access-token') || ''

    console.log(jwtDecode(accessToken))
    if (!accessToken || accessToken === undefined) {
      setIsLoggedIn(false)
      return navigate('/login')
    }
    document.cookie = `access-token=${accessToken}`
    setIsLoggedIn(true)
    return null
  }

  useEffect(() => {
    checkUserToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return isLoggedIn ? children : null
}

ProtectedRoute.propTypes = {
  children: PropTypes.any, // eslint-disable-line
}

ProtectedRoute.defaultProps = {
  children: null,
}

export default ProtectedRoute
