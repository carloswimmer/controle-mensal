export default function handleError(error: any): string {
  const response = error.message

  if (response.charAt(0) === '{') {
    const responseError = JSON.parse(response)
    return responseError.error.message
  }

  if (typeof response === 'string') {
    return response
  }

  return ''
}
