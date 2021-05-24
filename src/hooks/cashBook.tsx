import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

interface MovementData {
  id: number
  description: string
  bank: string
  payDay: string
  amount: number
  credit: boolean
}

interface CashBookContextData {
  movements: MovementData[]
}

function createData(
  id: number,
  description: string,
  bank: string,
  payDay: string,
  amount: number,
  credit: boolean,
) {
  return { id, description, bank, payDay, amount, credit }
}

const rows = [
  createData(1, 'Elektro', 'Nubank', '02/06/2021', 240.3, false),
  createData(2, 'Nextel', 'Nubank', '03/06/2021', 70, false),
  createData(3, 'CC Santander', 'Santander', '05/06/2021', 2044.0, false),
  createData(4, 'Salário', 'Nubank', '15/06/2021', 3280.44, true),
  createData(5, 'Salário', 'Santander', '15/06/2021', 5640.3, true),
]

const CashBookContext = createContext<CashBookContextData>(
  {} as CashBookContextData,
)

const CashBookProvider = ({ children }: PropsWithChildren<{}>) => {
  const [movements, setMovements] = useState<MovementData[]>([])

  useEffect(() => {
    setMovements([...rows])
  }, [])

  return (
    <CashBookContext.Provider value={{ movements }}>
      {children}
    </CashBookContext.Provider>
  )
}

const useCashBook = (): CashBookContextData => {
  return useContext(CashBookContext)
}

export { CashBookProvider, useCashBook }
