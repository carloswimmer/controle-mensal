interface PropertyData {
  values: string[]
}

export function getFromSessionStorage(
  userId: string,
  key: string,
): string[] | null {
  const smallUserId = userId.substr(0, 12)
  const data = sessionStorage.getItem(`@ControleMensal:${smallUserId}`)
  const property: PropertyData = data && JSON.parse(data)[key]

  return data ? property?.values : null
}

export function setToSessionStorage(
  userId: string,
  key: string,
  values: string[],
): void {
  const smallUserId = userId.substr(0, 12)
  const storageData = sessionStorage.getItem(`@ControleMensal:${smallUserId}`)
  const properties = storageData ? JSON.parse(storageData) : {}
  const data = { [key]: { values } }

  sessionStorage.setItem(
    `@ControleMensal:${smallUserId}`,
    JSON.stringify({ ...properties, ...data }),
  )
}
