export default function handleDataLayer(event: string, data: any): void {
  const { dataLayer = [] } = window

  dataLayer.push({ event, ...data })
}
