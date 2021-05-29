import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { EntryData, useCashBook } from './cashBook'

interface FilterContextData {
  filterResults: EntryData[]
  years: string[]
  months: string[]
  descriptions: string[]
  banks: string[]
  dashboardHeader: string
  addFilter(filter: FilterData): void
  removeFilters(): void
  addDescription(description: string): void
  addBank(bank: string): void
}

export interface FilterData {
  type: string
  value: string | null
}

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const currentYear = new Date().getFullYear().toString()

const currentMonth = monthNames[new Date().getMonth()]

export const initialFilterValues: FilterData[] = [
  { type: 'year', value: currentYear },
  { type: 'month', value: currentMonth },
]

const FilterContext = createContext<FilterContextData>({} as FilterContextData)

const FilterProvider = ({ children }: PropsWithChildren<{}>) => {
  const [filterResults, setFilterResults] = useState<EntryData[]>([])
  const [years, setYears] = useState<string[]>([])
  const [months, setMonths] = useState<string[]>([])
  const [descriptions, setDescriptions] = useState<string[]>([])
  const [banks, setBanks] = useState<string[]>([])
  const [filters, setFilters] = useState<FilterData[]>(initialFilterValues)
  const [dashboardHeader, setDashboardHeader] = useState<string>(currentMonth)
  const { entries } = useCashBook()

  useEffect(() => {
    const onlyYears = entries.map(item => item.payDay.getFullYear().toString())
    const uniqueYears = new Set(onlyYears)
    setYears(Array.from(uniqueYears))

    const onlyMonths = entries.map(item => monthNames[item.payDay.getMonth()])
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
        entry => entry.payDay.getFullYear().toString() === yearFilter.value,
      )
      results = [...filtered]
    }

    const monthFilter = filters.find(filter => filter.type === 'month')
    if (monthFilter && monthFilter.value) {
      const filtered = results.filter(
        entry => monthNames[entry.payDay.getMonth()] === monthFilter.value,
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

  useEffect(() => {
    const filterTypeMonth = filters.find(filter => filter.type === 'month')
    const filterTypeYear = filters.find(filter => filter.type === 'year')
    if (filterTypeMonth) {
      if (filterTypeMonth.value) {
        setDashboardHeader(filterTypeMonth.value)
        return
      }

      if (filterTypeYear && filterTypeYear.value) {
        setDashboardHeader(filterTypeYear.value)
        return
      }

      setDashboardHeader('Lançamentos')
    }
  }, [filters])

  const addFilter = useCallback(
    (filter: FilterData) => {
      const newFilters = filters.filter(item => item.type !== filter.type)
      newFilters.push(filter)

      setFilters([...newFilters])
    },
    [filters],
  )

  const removeFilters = useCallback(() => {
    setFilters([...initialFilterValues])
  }, [])

  const addDescription = useCallback((description: string) => {
    setDescriptions(state => [...state, description])
  }, [])

  const addBank = useCallback((bank: string) => {
    setBanks(state => [...state, bank])
  }, [])

  return (
    <FilterContext.Provider
      value={{
        filterResults,
        years,
        months,
        descriptions,
        banks,
        dashboardHeader,
        addFilter,
        removeFilters,
        addDescription,
        addBank,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

const useFilter = (): FilterContextData => {
  return useContext(FilterContext)
}

export { FilterProvider, useFilter }
