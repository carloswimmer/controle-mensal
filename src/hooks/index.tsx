import { PropsWithChildren } from 'react'
import { DarkModeProvider } from './darkMode'
import { ThemeProvider } from './theme'
import { ToastProvider } from './toast'

const AppProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <DarkModeProvider>
      <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </DarkModeProvider>
  )
}

export default AppProvider
