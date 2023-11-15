import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Grid, TextField, Typography, styled } from '@mui/material'
import Logo from '../components/Logo'
import { loginUser, selectUser } from '../slices/UserSlice'
import { getToken } from '../helpers'

const LoginPage = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  const handleEmailChange = (e) => setEmail(e?.target?.value)
  const handlePasswordChange = (e) => setPassword(e?.target?.value)

  useEffect(() => {
    const token = getToken()
    if (token && token.length > 0) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = () => {
    const token = getToken()
    if (!token || token.length === 0) {
      dispatch(loginUser({ email, password }))
      navigate('/')
    }
  }

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      sx={{ minHeight: '100vh' }}
      gap={2}
      spacing={0}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '300px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Logo />
        <TextField
          variant="outlined"
          InputLabelProps={{
            shrink: false,
          }}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          disabled={user.loading}
          sx={{ width: '100%' }}
        />
        <TextField
          variant="outlined"
          InputLabelProps={{
            shrink: false,
          }}
          placeholder="Password"
          type="password"
          autoComplete="on"
          value={password}
          onChange={handlePasswordChange}
          disabled={user.loading}
          sx={{ width: '100%' }}
        />
        {user.error && (
          <StyledTypography variant="body2">{user.error}</StyledTypography>
        )}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', minWidth: 0 }}
        >
          <Button
            variant="outlined"
            onClick={handleLogin}
            disabled={user.loading}
          >
            Login
          </Button>
          <Link to="/register">
            <Button variant="contained" disabled={user.loading}>
              Register
            </Button>
          </Link>
        </Box>
      </form>
    </Grid>
  )
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.customRed.Z00,
}))

export default LoginPage
