import React, { useEffect } from 'react'
import { styled, Link, Button, Grid, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getToken } from '../helpers'
import Logo from '../components/Logo'
import { selectUser } from '../slices/UserSlice'

const RegisterPage = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  useEffect(() => {
    const token = getToken()
    if (token && token.length > 0) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(user)

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
      <Logo />
      <TextField
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Email"
        type="text"
        sx={{ width: '100%', maxWidth: '300px' }}
      />
      <TextField
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Repeat email"
        type="text"
        sx={{ width: '100%', maxWidth: '300px' }}
      />
      <TextField
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Password"
        type="password"
        sx={{ width: '100%', maxWidth: '300px' }}
      />
      <TextField
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Repeat password"
        type="password"
        sx={{ width: '100%', maxWidth: '300px' }}
      />
      <Button variant="contained" sx={{ marginTop: '1em' }}>
        Register
      </Button>

      <StyledLink href="/">Already have an account?</StyledLink>
    </Grid>
  )
}

const StyledLink = styled(Link)({
  marginTop: '1em',
  fontSize: '14px',
  cursor: 'pointer',
})

export default RegisterPage
