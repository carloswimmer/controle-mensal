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
  filterResults: EntryData[]
  years: string[]
  months: number[]
  descriptions: string[]
  banks: string[]
  checkEntry(id: string): void
  addFilter(filter: FilterData): void
  removeFilters(): void
}

export interface FilterData {
  type: string
  value: string | number | null
}

const entriesRef = db.collection('entries')

const CashBookContext = createContext<CashBookContextData>(
  {} as CashBookContextData,
)

const CashBookProvider = ({ children }: PropsWithChildren<{}>) => {
  const [entries, setEntries] = useState<EntryData[]>([])
  const [filterResults, setFilterResults] = useState<EntryData[]>([])
  const [years, setYears] = useState<string[]>([])
  const [months, setMonths] = useState<number[]>([])
  const [descriptions, setDescriptions] = useState<string[]>([])
  const [banks, setBanks] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterData[]>([])
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
        setFilterResults([...docs])
      } catch (error) {
        const message = handleError(error)
        addToast({ text: message })
      }
    }

    getEntries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onlyYears = entries.map(item =>
      new Date(item.payDay).getFullYear().toString(),
    )
    const uniqueYears = new Set(onlyYears)
    setYears(Array.from(uniqueYears))

    const onlyMonths = entries.map(item => new Date(item.payDay).getMonth())
    const uniqueMonths = new Set(onlyMonths)
    setMonths(Array.from(uniqueMonths))

    const onlyDescriptions = entries.map(entry => entry.description)
    const uniqueDescriptions = new Set(onlyDescriptions)
    setDescriptions(Array.from(uniqueDescriptions))

    const onlyBanks = entries.map(entry => entry.bank)
    const uniqueBanks = new Set(onlyBanks)
    setBanks(Array.from(uniqueBanks))
  }, [entries])

  useEffect(() => {
    let results = [...entries]

    const yearFilter = filters.find(filter => filter.type === 'year')
    if (yearFilter && yearFilter.value) {
      const filtered = results.filter(
        entry =>
          new Date(entry.payDay).getFullYear().toString() === yearFilter.value,
      )
      results = [...filtered]
    }

    const monthFilter = filters.find(filter => filter.type === 'month')
    if (monthFilter && monthFilter.value) {
      const filtered = results.filter(
        entry => new Date(entry.payDay).getMonth() === monthFilter.value,
      )
      results = [...filtered]
    }

    const bankFilter = filters.find(filter => filter.type === 'bank')
    if (bankFilter && bankFilter.value) {
      const filtered = results.filter(entry => entry.bank === bankFilter.value)
      results = [...filtered]
    }

    const descriptionFilter = filters.find(
      filter => filter.type === 'description',
    )
    if (descriptionFilter && descriptionFilter.value) {
      const filtered = results.filter(
        entry => entry.description === descriptionFilter.value,
      )
      results = [...filtered]
    }

    setFilterResults([...results])
  }, [filters, entries])

  const checkEntry = useCallback(
    (id: string) => {
      const index = entries.findIndex(entry => entry.id === id)
      entries[index].paid = !entries[index].paid
      setEntries([...entries])
      console.log('entries', entries)
    },
    [entries],
  )

  const addFilter = useCallback(
    (filter: FilterData) => {
      const newFilters = filters.filter(item => item.type !== filter.type)
      newFilters.push(filter)
      setFilters([...newFilters])
    },
    [filters],
  )

  const removeFilters = useCallback(() => {
    setFilters([])
  }, [])

  return (
    <CashBookContext.Provider
      value={{
        entries,
        filterResults,
        years,
        months,
        descriptions,
        banks,
        checkEntry,
        addFilter,
        removeFilters,
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
