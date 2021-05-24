import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

interface EntryData {
  id: number
  description: string
  bank: string
  payDay: string
  amount: number
  credit: boolean
}

interface CashBookContextData {
  entries: EntryData[]
}

function createData(
  id: number,
  description: string,
  bank: string,
  payDay: string,
  amount: number,
  credit: boolean,
) {
  return { id, description, bank, payDay, amount, credit }
}

const rows = [
  createData(1, 'Elektro', 'Nubank', '2021-06-02', 240.3, false),
  createData(2, 'Nextel', 'Nubank', '2021-06-03', 70, false),
  createData(3, 'CC Santander', 'Santander', '2021-06-05', 2044.0, false),
  createData(4, 'Salário', 'Nubank', '2021-06-15', 3280.44, true),
  createData(5, 'Salário', 'Santander', '2021-06-15', 5640.3, true),
]

const CashBookContext = createContext<CashBookContextData>(
  {} as CashBookContextData,
)

const CashBookProvider = ({ children }: PropsWithChildren<{}>) => {
  const [entries, setEntries] = useState<EntryData[]>([])

  useEffect(() => {
    setEntries([...rows])
  }, [])

  return (
    <CashBookContext.Provider value={{ entries }}>
      {children}
    </CashBookContext.Provider>
  )
}

const useCashBook = (): CashBookContextData => {
  return useContext(CashBookContext)
}

export { CashBookProvider, useCashBook }
