import {
  createContext,
  useCallback,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from 'react'

interface DarkModeContextData {
  darkMode: boolean
  toggleDarkMode(): void
}

const DarkModeContext = createContext<DarkModeContextData>(
  {} as DarkModeContextData,
)

const DarkModeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [darkMode, setDarkMode] = useState(() => {
    const mode = localStorage.getItem('@ControleMensal:darkMode')

    return mode ? !!mode : true
  })

  useEffect(() => {
    localStorage.setItem('@ControleMensal:darkMode', darkMode.toString())
  }, [darkMode])

  const toggleDarkMode = useCallback(() => {
    setDarkMode((state) => !state)
  }, [])

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

const useDarkMode = (): DarkModeContextData => {
  return useContext(DarkModeContext)
}

export { DarkModeProvider, useDarkMode }
