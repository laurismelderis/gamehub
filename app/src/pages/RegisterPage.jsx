import React from 'react'

import { styled, Link, Button, Grid, TextField } from '@mui/material'
import Logo from '../components/Logo'

const RegisterPage = () => (
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
    />
    <TextField
      variant="standard"
      label="Repeat email"
      sx={{ width: '100%', maxWidth: '300px' }}
    />
    <TextField
      variant="standard"
      label="Password"
      sx={{ width: '100%', maxWidth: '300px' }}
    />
    <TextField
      variant="standard"
      label="Repeat"
      sx={{ width: '100%', maxWidth: '300px' }}
    />
    <Button variant="contained" sx={{ marginTop: '1em' }}>
      Register
    </Button>

    <StyledLink href="/">Already have an account?</StyledLink>
  </Grid>
)

const StyledLink = styled(Link)({
  marginTop: '1em',
  fontSize: '12px',
  cursor: 'pointer',
})

export default RegisterPage
