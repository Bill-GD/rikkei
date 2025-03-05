export function invalidRequest(res, status = 400, message, optional) {
  res.status(status).json({ message: message || 'Invalid request', ...optional });
}

export function internalServerError(res, error) {
  invalidRequest(res, 500, 'An error occurred', { error });
}
