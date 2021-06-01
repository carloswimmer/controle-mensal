import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'

export function getMonthNames() {
  const months: string[] = []

  for (let i = 0; i < 12; i++) {
    const name: string = pt.localize?.month(i)
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1)
    months.push(capitalized)
  }

  return months
}

export function getCapitalizedMonth(date: Date) {
  const month = format(date, 'MMMM', { locale: pt })
  return month.charAt(0).toUpperCase() + month.slice(1)
}
