export function handleProductQuery(req, res, next) {
  if (isNaN(parseInt(req.params.id))) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  next();
}
