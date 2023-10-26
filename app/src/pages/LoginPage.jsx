import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Grid, TextField } from '@mui/material'
import Logo from '../components/Logo'

const LoginPage = () => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    direction="column"
    sx={{ minHeight: '100vh' }}
    spacing={0}
  >
    <Logo />
    <TextField
      variant="standard"
      label="Email"
      sx={{ width: '100%', maxWidth: '260px' }}
    />
    <TextField
      variant="standard"
      label="Password"
      sx={{ width: '100%', maxWidth: '260px' }}
    />
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: '100%', maxWidth: '260px', marginTop: '1em' }}
    >
      <Button variant="outlined">Login</Button>
      <Link to="/register">
        <Button variant="contained">Register</Button>
      </Link>
    </Box>
  </Grid>
)

export default LoginPage
