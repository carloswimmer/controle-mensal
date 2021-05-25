import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface EntryData {
  id: number
  paid: boolean
  description: string
  bank: string
  payDay: string
  amount: number
  credit: boolean
}

interface CashBookContextData {
  entries: EntryData[]
  checkEntry(id: number): void
}

function createData(
  id: number,
  paid: boolean,
  description: string,
  bank: string,
  payDay: string,
  amount: number,
  credit: boolean,
) {
  return { id, paid, description, bank, payDay, amount, credit }
}

const rows = [
  createData(1, false, 'Elektro', 'Nubank', '2021-06-02', 240.3, false),
  createData(2, true, 'Nextel', 'Nubank', '2021-06-03', 70, false),
  createData(3, true, 'CC Santander', 'Santander', '2021-06-05', 2044.0, false),
  createData(4, false, 'Salário', 'Nubank', '2021-06-15', 3280.44, true),
  createData(5, false, 'Salário', 'Santander', '2021-06-15', 5640.3, true),
  createData(
    6,
    false,
    'Investimento',
    'Santander',
    '2021-06-15',
    14702.3,
    true,
  ),
  createData(7, false, 'Investimento', 'Nubank', '2021-06-15', 35640.3, true),
]

const CashBookContext = createContext<CashBookContextData>(
  {} as CashBookContextData,
)

const CashBookProvider = ({ children }: PropsWithChildren<{}>) => {
  const [entries, setEntries] = useState<EntryData[]>([])

  const checkEntry = useCallback(
    (id: number) => {
      const index = entries.findIndex(entry => entry.id === id)
      entries[index].paid = !entries[index].paid
      setEntries([...entries])
      console.log('entries', entries)
    },
    [entries],
  )

  useEffect(() => {
    setEntries([...rows])
  }, [])

  return (
    <CashBookContext.Provider value={{ entries, checkEntry }}>
      {children}
    </CashBookContext.Provider>
  )
}

const useCashBook = (): CashBookContextData => {
  return useContext(CashBookContext)
}

export { CashBookProvider, useCashBook }
