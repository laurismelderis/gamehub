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
    MuiInputBase: {
      styleOverrides: {
        input: { borderBottom: `2px solid ${grey.B10}` },
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
  typography: {
    fontFamily: 'Spline Sans',
    fontSize: 16,
    fontWeightRegular: '600',
    fontWeightMedium: '500',
    fontWeightLight: '400',
  },
})

export default theme
