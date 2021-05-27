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
  payDay: Date
  amount: number
  credit: boolean
}

interface CashBookContextData {
  entries: EntryData[]
  checkEntry(id: string): void
}

const entriesRef = db.collection('entries')

const CashBookContext = createContext<CashBookContextData>(
  {} as CashBookContextData,
)

const CashBookProvider = ({ children }: PropsWithChildren<{}>) => {
  const [entries, setEntries] = useState<EntryData[]>([])
  const { addToast } = useToast()

  useEffect(() => {
    async function getEntries() {
      try {
        const response = await entriesRef.get()

        const docs: EntryData[] = []
        response.forEach(doc => {
          const entry = doc.data()
          docs.push({ ...entry, payDay: new Date(entry.payDay) } as EntryData)
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

  const checkEntry = useCallback(
    (id: string) => {
      const index = entries.findIndex(entry => entry.id === id)
      entries[index].paid = !entries[index].paid
      setEntries([...entries])
      console.log('entries', entries)
    },
    [entries],
  )

  return (
    <CashBookContext.Provider
      value={{
        entries,
        checkEntry,
      }}
    >
      {children}
    </CashBookContext.Provider>
  )
}

const useCashBook = (): CashBookContextData => {
  return useContext(CashBookContext)
}

export { CashBookProvider, useCashBook }
