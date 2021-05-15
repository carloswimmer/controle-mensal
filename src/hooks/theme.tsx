import { PropsWithChildren, useMemo } from 'react'
import { CssBaseline } from '@material-ui/core'
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'

import { useDarkMode } from './darkMode'

export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const { darkMode } = useDarkMode()

  const theme = useMemo(() => {
    return createMuiTheme({
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: {
          light: '#62efff',
          main: '#00bcd4',
          dark: '#008ba3',
          contrastText: '#fafafa',
        },
        secondary: {
          light: '#ff77a9',
          main: '#ec407a',
          dark: '#b4004e',
          contrastText: '#FAFAFA',
        },
        warning: {
          main: '#FF6D00',
        },
        error: {
          main: '#D50000',
          contrastText: '#FAFAFA',
        },
        text: {
          primary: darkMode ? '#00bcd4' : '#37474f',
        },
      },
      typography: {
        fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
      },
    })
  }, [darkMode])

  return (
    <MuiThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </MuiThemeProvider>
  )
}
