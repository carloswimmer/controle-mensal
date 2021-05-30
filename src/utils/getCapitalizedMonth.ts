import { format } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'

export default function getCapitalizedMonth(date: Date) {
  const month = format(date, 'MMMM', { locale: pt })
  return month.charAt(0).toLocaleUpperCase() + month.slice(1)
}
