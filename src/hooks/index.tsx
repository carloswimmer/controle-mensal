import { PropsWithChildren } from 'react'
import { DarkModeProvider } from './darkMode'
import { ThemeProvider } from './theme'

const AppProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <DarkModeProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </DarkModeProvider>
  )
}

export default AppProvider
