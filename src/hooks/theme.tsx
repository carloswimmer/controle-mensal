import { PropsWithChildren, useMemo } from 'react'
import { CssBaseline } from '@mui/material'
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  Theme,
  StyledEngineProvider,
  adaptV4Theme,
} from '@mui/material/styles';
import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'

import { useDarkMode } from './darkMode'


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const { darkMode } = useDarkMode()

  const theme = useMemo(() => {
    return createMuiTheme(adaptV4Theme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
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
    }));
  }, [darkMode])

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        {children}
        <CssBaseline />
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}
