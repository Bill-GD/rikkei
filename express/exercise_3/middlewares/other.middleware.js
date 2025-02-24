export function checkPageQuery(req, res, next) {
  if (req.query.page !== undefined && req.query.limit !== undefined) {
    const [page, limit] = [parseInt(req.query.page), parseInt(req.query.limit)];
    if (isNaN(page) || isNaN(limit)) {
      return res.status(400).json({ message: `'page' or 'limit' is not a number` });
    }
  }
  next();
}

export function checkSortQuery(req, res, next) {
  if (req.query.sort !== undefined && req.query.order !== undefined) {
    const sortableFields = req.sortableFields,
      orders = ['asc', 'desc'];

    if (sortableFields === undefined) {
      return res.status(400).json({ message: `No sortable fields` });
    }

    if (!sortableFields.includes(req.query.sort)) {
      return res.status(400)
                .json({
                  message: `'sort' query parameter is invalid`,
                  fields: sortableFields,
                });
    }

    if (!orders.includes(req.query.order)) {
      return res.status(400)
                .json({
                  message: `'order' query parameter is invalid`,
                  types: orders,
                });
    }
  }
  next();
}
