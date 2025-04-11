export function internalError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error.message,
  });
}

export function requestError(res, error) {
  res.status(400).json({
    message: `There's an error with the request`,
    error,
  });
}
