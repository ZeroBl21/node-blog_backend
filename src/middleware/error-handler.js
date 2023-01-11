const errorHandler = (error, _req, res, _next) => {
  console.error(error)
  const response = {}
  const status = error.statusCode || 500

  response.error = error.message || 'Something went wrong, please try again'
  if (error.data) {
    response.data = error.data
  }

  res.status(status).json(response)
}

export default errorHandler
