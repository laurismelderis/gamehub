import { createTheme } from '@mui/material'
import { grey, white, red } from './colors'

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: grey.Z00,
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            border: `1px solid ${white.Z00}`,
          },
        },
        {
          props: { variant: 'standard' },
          style: {
            borderBottom: `2px solid ${grey.B10}`,
          },
        },
      ],
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
    customRed: red,
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
