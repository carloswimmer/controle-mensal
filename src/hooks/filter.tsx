import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { format } from 'date-fns'
import { EntryData, useCashBook } from './cashBook'
import getCapitalizedMonth from '../utils/getCapitalizedMonth'

interface FilterContextData {
  filterResults: EntryData[]
  filters: FilterData[]
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

const currentYear = format(new Date(), 'yyyy')

const currentMonth = getCapitalizedMonth(new Date())

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
    const onlyYears = entries.map(item => format(item.payDay, 'yyyy'))
    const uniqueYears = new Set(onlyYears)
    const arrayOfYears = Array.from(uniqueYears).sort().reverse()
    setYears([...arrayOfYears])
  }, [entries])

  useEffect(() => {
    const onlyMonths = entries.map(item => ({
      number: format(item.payDay, 'MM'),
      name: getCapitalizedMonth(item.payDay),
    }))
    const sortedMonths = onlyMonths.sort((a, b) => {
      if (a.number < b.number) return -1
      if (a.number > b.number) return 1
      return 0
    })
    const onlyMonthNames = sortedMonths.map(item => item.name)
    const uniqueMonths = new Set(onlyMonthNames)
    setMonths(Array.from(uniqueMonths))
  }, [entries])

  useEffect(() => {
    const onlyDescriptions = entries.map(entry => entry.description)
    const uniqueDescriptions = new Set(onlyDescriptions)
    const arrayOfDescriptions = Array.from(uniqueDescriptions).sort()
    setDescriptions([...arrayOfDescriptions])
  }, [entries])

  useEffect(() => {
    const onlyBanks = entries.map(entry => entry.bank)
    const uniqueBanks = new Set(onlyBanks)
    const arrayOfBanks = Array.from(uniqueBanks).sort()
    setBanks([...arrayOfBanks])
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
        entry => getCapitalizedMonth(entry.payDay) === monthFilter.value,
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
        filters,
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
