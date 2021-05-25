import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface EntryData {
  id: string
  paid: boolean
  description: string
  bank: string
  payDay: string
  amount: number
  credit: boolean
}

interface CashBookContextData {
  entries: EntryData[]
  banks: string[]
  years: string[]
  checkEntry(id: string): void
  filterByBank(value: string | null): void
}

function createData(
  id: string,
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
  createData(uuidv4(), false, 'Elektro', 'Nubank', '2021-06-02', 240.3, false),
  createData(uuidv4(), true, 'Nextel', 'Nubank', '2021-06-03', 70, false),
  createData(
    uuidv4(),
    true,
    'CC Santander',
    'Santander',
    '2021-06-05',
    2044.0,
    false,
  ),
  createData(uuidv4(), false, 'Salário', 'Nubank', '2021-06-15', 3280.44, true),
  createData(
    uuidv4(),
    false,
    'Salário',
    'Santander',
    '2021-06-15',
    5640.3,
    true,
  ),
  createData(
    uuidv4(),
    false,
    'Investimento',
    'Santander',
    '2021-06-15',
    14702.3,
    true,
  ),
  createData(
    uuidv4(),
    false,
    'Investimento',
    'Nubank',
    '2021-06-15',
    35640.3,
    true,
  ),
]

const CashBookContext = createContext<CashBookContextData>(
  {} as CashBookContextData,
)

const CashBookProvider = ({ children }: PropsWithChildren<{}>) => {
  const [entries, setEntries] = useState<EntryData[]>([])
  const [years, setYears] = useState<string[]>([])
  const [banks, setBanks] = useState<string[]>([])

  useEffect(() => {
    const onlyYears = rows.map(item =>
      new Date(item.payDay).getFullYear().toString(),
    )
    const uniqueYears = new Set(onlyYears)
    setYears(Array.from(uniqueYears))

    const onlyBanks = rows.map(entry => entry.bank)
    const uniqueBanks = new Set(onlyBanks)
    setBanks(Array.from(uniqueBanks))

    setEntries([...rows])
  }, [])

  const checkEntry = useCallback(
    (id: string) => {
      const index = entries.findIndex(entry => entry.id === id)
      entries[index].paid = !entries[index].paid
      setEntries([...entries])
      console.log('entries', entries)
    },
    [entries],
  )

  const filterByBank = useCallback((value: string | null) => {
    const result = rows.filter(item => item.bank === value)
    value ? setEntries([...result]) : setEntries([...rows])
  }, [])

  return (
    <CashBookContext.Provider
      value={{ entries, years, banks, checkEntry, filterByBank }}
    >
      {children}
    </CashBookContext.Provider>
  )
}

const useCashBook = (): CashBookContextData => {
  return useContext(CashBookContext)
}

export { CashBookProvider, useCashBook }
