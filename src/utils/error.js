export const handleError = (statusCode, message, data = null) => {
  const error = new Error(message)
  error.statusCode = statusCode
  error.data = data

  return error
}
