export function setToSessionStorage(key: string, value: any): void {
  const data = { value }

  sessionStorage.setItem(`@ControleMensal:${key}`, JSON.stringify(data))
}

export function getFromSessionStorage(key: string): string[] | null {
  const data = sessionStorage.getItem(`@ControleMensal:${key}`)

  return data ? JSON.parse(data)['value'] : null
}
