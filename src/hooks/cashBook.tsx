import { formatISO } from 'date-fns'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { db } from '../firebase'
import { EntryFormData } from '../pages/Dashboard/FormDialog/Form'

export interface EntryData {
  id: string
  paid: boolean
  description: string
  bank: string
  payDay: Date
  amount: number
  payType: 'credit' | 'debit'
}

interface CashBookContextData {
  entries: EntryData[]
  checkEntry(id: string): void
  addEntry(values: EntryFormData): Promise<void>
}

const entriesRef = db.collection('entries')

const CashBookContext = createContext<CashBookContextData>(
  {} as CashBookContextData,
)

const CashBookProvider = ({ children }: PropsWithChildren<{}>) => {
  const [entries, setEntries] = useState<EntryData[]>([])

  useEffect(() => {
    const cleanup = entriesRef.orderBy('payDay').onSnapshot(snapshot => {
      const dbEntries = snapshot.docs.map(doc => {
        const entry = doc.data()
        return {
          ...entry,
          id: doc.id,
          payDay: new Date(entry.payDay),
        } as EntryData
      })

      setEntries([...dbEntries])
    })

    return () => {
      cleanup()
    }
  }, [])

  const addEntry = useCallback((values: EntryFormData) => {
    const payDay = formatISO(values.payDay, { representation: 'date' })
    const payload = { ...values, payDay, paid: false }

    return entriesRef.doc().set(payload)
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
        addEntry,
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
