import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { db } from '../firebase'
import handleError from '../utils/handleError'
import { useToast } from './toast'
// import { v4 as uuidv4 } from 'uuid'

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

const entriesRef = db.collection('entries')

const rows: EntryData[] = []

const CashBookContext = createContext<CashBookContextData>(
  {} as CashBookContextData,
)

const CashBookProvider = ({ children }: PropsWithChildren<{}>) => {
  const [entries, setEntries] = useState<EntryData[]>([])
  const [years, setYears] = useState<string[]>([])
  const [banks, setBanks] = useState<string[]>([])
  const { addToast } = useToast()

  useEffect(() => {
    async function getEntries() {
      try {
        const response = await entriesRef.get()

        const docs: EntryData[] = []
        response.forEach(doc => {
          const entry = doc.data() as EntryData
          docs.push(entry)
        })

        setEntries([...docs])
      } catch (error) {
        const message = handleError(error)
        addToast({ text: message })
      }
    }

    getEntries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
