import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { addMonths, formatISO, parseISO } from 'date-fns'

import { db, DocumentReference } from '../firebase'
import { useAuth } from './auth'
import { useDialogControl } from './dialogControl'
import { handleFirstTime } from '../utils/handleTutorial'
import handleDataLayer from '../utils/handleDataLayer'

export interface EntryData {
  id?: string
  paid: boolean
  description: string
  bank: string
  payDay: Date
  amount: number
  payType: 'credit' | 'debit' | 'investment'
}

interface CashBookContextData {
  entries: EntryData[]
  isLoading: boolean
  checkEntry(id: string, value: boolean): Promise<void>
  saveEntry(values: EntryData): Promise<DocumentReference | void>
  deleteEntry(id: string): Promise<void>
  createClone(): Promise<Date>
}

const accountsRef = db.collection('accounts')

const CashBookContext = createContext<CashBookContextData>(
  {} as CashBookContextData,
)

const CashBookProvider = ({ children }: PropsWithChildren<{}>) => {
  const { user } = useAuth()
  const { toggleDialog } = useDialogControl()
  const [entries, setEntries] = useState<EntryData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [entriesRef] = useState(accountsRef.doc(user.uid).collection('entries'))

  useEffect(() => {
    handleDataLayer('login', { email: user.email })
    setIsLoading(true)
    const cleanup = entriesRef.orderBy('payDay').onSnapshot(snapshot => {
      const dbEntries = snapshot.docs.map(doc => {
        const entry = doc.data()
        return {
          ...entry,
          id: doc.id,
          payDay: parseISO(entry.payDay),
        } as EntryData
      })

      handleFirstTime({
        entries: dbEntries,
        toggleFunction: toggleDialog,
        name: 'tutorial-step1',
        state: true,
      })
      setEntries([...dbEntries])
      setIsLoading(false)
    })

    return () => {
      cleanup()
    }
    // eslint-disable-next-line
  }, [])

  const saveEntry = useCallback(
    (values: EntryData) => {
      const payDay = formatISO(values.payDay, { representation: 'date' })
      const payload = { ...values, payDay, amount: +values.amount }
      delete payload.id

      if (values.id) {
        return entriesRef.doc(values.id).set(payload)
      }

      return entriesRef.add(payload)
    },
    [entriesRef],
  )

  const checkEntry = useCallback(
    (id: string, value: boolean) => {
      return entriesRef.doc(id).update({ paid: value })
    },
    [entriesRef],
  )

  const deleteEntry = useCallback(
    (id: string) => {
      return entriesRef.doc(id).delete()
    },
    [entriesRef],
  )

  const createClone = useCallback(async () => {
    const lastDoc = await entriesRef.orderBy('payDay', 'desc').limit(1).get()
    const lastPayDay = lastDoc.docs[0].data().payDay
    const clonedDate = addMonths(parseISO(lastPayDay), 1)

    const lastMonthDocs = await entriesRef
      .where('payDay', '>=', lastPayDay.substr(0, 8) + '01')
      .where('payDay', '<=', lastPayDay.substr(0, 8) + '31')
      .get()

    const batch = db.batch()

    lastMonthDocs.forEach(doc => {
      const entry = doc.data()
      const newDate = addMonths(parseISO(entry.payDay), 1)
      entry.payDay = formatISO(newDate, { representation: 'date' })
      entry.paid = false
      entry.amount = 0

      const entryDoc = entriesRef.doc()
      batch.set(entryDoc, entry)
    })

    await batch.commit()

    return clonedDate
  }, [entriesRef])

  return (
    <CashBookContext.Provider
      value={{
        entries,
        isLoading,
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
