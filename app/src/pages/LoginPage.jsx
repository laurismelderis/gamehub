import React from 'react'
import { Grid, TextField } from '@mui/material'
import { ReactComponent as IconLogo } from '../assets/GameHubLogo.svg'

const LoginPage = () => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    direction="column"
    sx={{ minHeight: '100vh' }}
    spacing={0}
  >
    <IconLogo style={{ marginBottom: '1em' }} />
    <TextField
      variant="standard"
      label="email"
      sx={{ width: '100%', maxWidth: '260px' }}
    />
    <TextField
      variant="standard"
      label="password"
      sx={{ width: '100%', maxWidth: '260px' }}
    />
  </Grid>
)

export default LoginPage
