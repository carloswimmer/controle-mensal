import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { formatISO, parseISO } from 'date-fns'

import { db, DocumentReference } from '../firebase'

export interface EntryData {
  id?: string
  paid: boolean
  description: string
  bank: string
  payDay: Date
  amount: number
  payType: 'credit' | 'debit'
}

interface CashBookContextData {
  entries: EntryData[]
  checkEntry(id: string, value: boolean): Promise<void>
  saveEntry(values: EntryData): Promise<DocumentReference | void>
  deleteEntry(id: string): Promise<void>
  createClone(): void
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
          payDay: parseISO(entry.payDay),
        } as EntryData
      })

      setEntries([...dbEntries])
    })

    return () => {
      cleanup()
    }
  }, [])

  const saveEntry = useCallback((values: EntryData) => {
    const payDay = formatISO(values.payDay, { representation: 'date' })
    const payload = { ...values, payDay }
    delete payload.id

    if (values.id) {
      return entriesRef.doc(values.id).set(payload)
    }

    return entriesRef.add(payload)
  }, [])

  const checkEntry = useCallback((id: string, value: boolean) => {
    return entriesRef.doc(id).update({ paid: value })
  }, [])

  const deleteEntry = useCallback((id: string) => {
    return entriesRef.doc(id).delete()
  }, [])

  const createClone = useCallback(async () => {
    const querySnapshot = await entriesRef
      .orderBy('payDay', 'desc')
      .limit(1)
      .get()
    const maxDate = querySnapshot.docs[0].data().payDay

    console.log('search date', maxDate.substr(0, 8) + '01')

    const snapshot = await entriesRef
      .where('payDay', '>=', maxDate.substr(0, 8) + '01')
      .where('payDay', '<=', maxDate.substr(0, 8) + '31')
      .get()

    snapshot.forEach(doc => {
      console.log('doc', doc.data())
    })
  }, [])

  return (
    <CashBookContext.Provider
      value={{
        entries,
        saveEntry,
        checkEntry,
        deleteEntry,
        createClone,
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
