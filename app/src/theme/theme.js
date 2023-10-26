import { createTheme } from '@mui/material'
import { grey, white } from './colors'

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: grey.Z00,
        },
      },
    },
  },
  palette: {
    primary: {
      main: white.Z00,
    },
    secondary: {
      main: grey.Z00,
    },
    text: {
      primary: white.Z00,
      secondary: grey.B40,
    },
    customGrey: grey,
    customWhite: white,
  },
})

export default theme
