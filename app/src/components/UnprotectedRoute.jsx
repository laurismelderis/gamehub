import { useEffect, useState } from 'react'
import PropTypes from 'prop-types' // eslint-disable-line
import { useNavigate } from 'react-router-dom'

const UnprotectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkUserToken = () => {
    const accessToken = localStorage.getItem('access-token')
    if (!accessToken || accessToken === 'undefined') {
      setIsLoggedIn(false)
      return navigate('/login')
    }

    setIsLoggedIn(true)
    return null
  }

  useEffect(() => {
    checkUserToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return isLoggedIn ? children : null
}

UnprotectedRoute.propTypes = {
  children: PropTypes.any, // eslint-disable-line
}

UnprotectedRoute.defaultProps = {
  children: null,
}

export default UnprotectedRoute
