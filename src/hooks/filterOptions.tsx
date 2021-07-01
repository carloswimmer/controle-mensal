import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { format } from 'date-fns'
import { useCashBook } from './cashBook'
import { useAuth } from './auth'
import { getMonthNames } from '../utils/handleMonths'
import {
  setToSessionStorage,
  getFromSessionStorage,
} from '../utils/handleSessionStorage'

interface FilterOptionsContextData {
  years: string[]
  months: string[]
  descriptions: string[]
  banks: string[]
  addDescription(description: string): void
  addBank(bank: string): void
}

const months = getMonthNames()

const FilterOptionsContext = createContext<FilterOptionsContextData>(
  {} as FilterOptionsContextData,
)

const FilterOptionsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [years, setYears] = useState<string[]>([])
  const [descriptions, setDescriptions] = useState<string[]>([])
  const [banks, setBanks] = useState<string[]>([])
  const { user } = useAuth()
  const { entries } = useCashBook()

  useEffect(() => {
    const onlyYears = entries.map(item => format(item.payDay, 'yyyy'))
    const uniqueYears = new Set(onlyYears)
    const arrayOfYears = Array.from(uniqueYears).sort().reverse()
    setYears([...arrayOfYears])
  }, [entries])

  useEffect(() => {
    const sessionData = getFromSessionStorage(user.uid, 'descriptions')
    if (sessionData?.length) {
      setDescriptions(sessionData)
      return
    }
    if (entries.length) {
      const onlyDescriptions = entries.map(entry => entry.description)
      const uniqueDescriptions = new Set(onlyDescriptions)
      const arrayOfDescriptions = Array.from(uniqueDescriptions).sort()
      setDescriptions([...arrayOfDescriptions])
    }
  }, [entries, user])

  useEffect(() => {
    const sessionData = getFromSessionStorage(user.uid, 'banks')
    if (sessionData?.length) {
      setBanks(sessionData)
      return
    }
    if (entries.length) {
      const onlyBanks = entries.map(entry => entry.bank)
      const uniqueBanks = new Set(onlyBanks)
      const arrayOfBanks = Array.from(uniqueBanks).sort()
      setBanks([...arrayOfBanks])
    }
  }, [entries, user])

  useEffect(() => {
    setToSessionStorage(user.uid, 'descriptions', [...descriptions])
  }, [descriptions, user])

  useEffect(() => {
    setToSessionStorage(user.uid, 'banks', [...banks])
  }, [banks, user])

  const addDescription = useCallback((description: string) => {
    setDescriptions(state => [...state, description])
  }, [])

  const addBank = useCallback((bank: string) => {
    setBanks(state => [...state, bank])
  }, [])

  return (
    <FilterOptionsContext.Provider
      value={{
        years,
        months,
        descriptions,
        banks,
        addDescription,
        addBank,
      }}
    >
      {children}
    </FilterOptionsContext.Provider>
  )
}

const useFilterOptions = (): FilterOptionsContextData => {
  return useContext(FilterOptionsContext)
}

export { FilterOptionsProvider, useFilterOptions }
