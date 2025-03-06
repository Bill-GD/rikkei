function invalidRequest(res, status, message, extra) {
  res.status(status).json({ message, ...extra });
}

function internalServerError(res, error) {
  res.status(500).json({ message: 'An error has occurred', error });
}
