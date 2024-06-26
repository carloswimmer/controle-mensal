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
import { useDialogControl } from './dialogControl'
import { getCapitalizedMonth } from '../utils/handleMonths'

interface FilterActionsContextData {
  filterResults: EntryData[]
  filters: FilterActionsData[]
  dashboardHeader: string
  addFilter(filter: FilterActionsData): void
  removeFilters(): void
  orderBy(property: string | null): void
}

export interface FilterActionsData {
  type: string
  value: string | null
}

const currentYear = format(new Date(), 'yyyy')

const currentMonth = getCapitalizedMonth(new Date())

export const initialFilterValues: FilterActionsData[] = [
  { type: 'year', value: currentYear },
  { type: 'month', value: currentMonth },
]

const FilterActionsContext = createContext<FilterActionsContextData>(
  {} as FilterActionsContextData,
)

const FilterActionsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [filterResults, setFilterResults] = useState<EntryData[]>([])
  const [filters, setFilters] =
    useState<FilterActionsData[]>(initialFilterValues)
  const [dashboardHeader, setDashboardHeader] = useState<string>(currentMonth)
  const { entries } = useCashBook()
  const { toggleDialog } = useDialogControl()

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
    (filter: FilterActionsData) => {
      const newFilters = filters.filter(item => item.type !== filter.type)

      switch (filter.value) {
        case 'Nova descrição':
          toggleDialog('description', true)
          break

        case 'Novo banco':
          toggleDialog('bank', true)
          break

        default:
          newFilters.push(filter)
          break
      }

      setFilters([...newFilters])
    },
    [filters, toggleDialog],
  )

  const removeFilters = useCallback(() => {
    setFilters([...initialFilterValues])
  }, [])

  const orderBy = useCallback(
    (property: string) => {
      let sorted = [...filterResults]

      if (property === 'Dia') {
        sorted = filterResults.sort((a, b) => {
          if (a.payDay > b.payDay) return 1
          if (a.payDay < b.payDay) return -1
          return 0
        })
      }

      if (property === 'Descrição') {
        sorted = filterResults.sort((a, b) => {
          if (a.description > b.description) return 1
          if (a.description < b.description) return -1
          return 0
        })
      }

      if (property === 'Créd/Déb/Invest') {
        sorted = filterResults.sort((a, b) => {
          if (a.payType > b.payType) return 1
          if (a.payType < b.payType) return -1
          return 0
        })
      }

      setFilterResults([...sorted])
    },
    [filterResults],
  )

  return (
    <FilterActionsContext.Provider
      value={{
        filterResults,
        filters,
        dashboardHeader,
        addFilter,
        removeFilters,
        orderBy,
      }}
    >
      {children}
    </FilterActionsContext.Provider>
  )
}

const useFilterActions = (): FilterActionsContextData => {
  return useContext(FilterActionsContext)
}

export { FilterActionsProvider, useFilterActions }
