import { EntryData } from '../hooks/cashBook'

interface FirstTimeProps {
  entries: EntryData[]
  toggleFunction(name: string, state: boolean): void
  name: string
  state: boolean
}

export const handleFirstTime = ({
  entries,
  toggleFunction,
  name,
  state,
}: FirstTimeProps) => {
  if (!entries.length) toggleFunction(name, state)
}
