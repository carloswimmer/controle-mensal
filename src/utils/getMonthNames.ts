import pt from 'date-fns/locale/pt-BR'

export default function getMonthNames() {
  const months: string[] = []

  for (let i = 0; i < 12; i++) {
    const name: string = pt.localize?.month(i)
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1)
    months.push(capitalized)
  }

  return months
}
