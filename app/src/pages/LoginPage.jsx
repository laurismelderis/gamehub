import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Grid, TextField } from '@mui/material'
import Logo from '../components/Logo'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => setEmail(e?.target?.value)
  const handlePasswordChange = (e) => setPassword(e?.target?.value)

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
        variant="standard"
        label="Email"
        sx={{ width: '100%', maxWidth: '300px' }}
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        variant="standard"
        label="Password"
        hidden
        sx={{ width: '100%', maxWidth: '300px' }}
        value={password}
        onChange={handlePasswordChange}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%', maxWidth: '300px' }}
      >
        <Button variant="outlined">Login</Button>
        <Link to="/register">
          <Button variant="contained">Register</Button>
        </Link>
      </Box>
    </Grid>
  )
}

export default LoginPage
