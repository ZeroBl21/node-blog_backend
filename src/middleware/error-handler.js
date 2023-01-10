const errorHandler = (error, _req, res, _next) => {
  console.error(error)
  const status = error.statusCode || 500
  const message = error.message || 'Something went wrong, please try again'
  const data = error.data

  res.status(status).json({ error: message, data })
}

export default errorHandler
