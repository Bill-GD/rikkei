export function handleProductQuery(req, res, next) {
  if (req.params.id !== undefined && isNaN(parseInt(req.params.id))) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  let { minRate, maxRate, sort, order, page, limit } = req.query;

  if (minRate !== undefined && maxRate !== undefined) {
    if (isNaN(parseInt(minRate)) || isNaN(parseInt(maxRate))) {
      return res.status(400).json({ message: `'minRate' or 'maxRate' is not a number` });
    }
    if (+minRate < 1 || +minRate > 5 || +maxRate < 1 || +maxRate > 5) {
      return res.status(400).json({ message: `'minRate' or 'maxRate' is out of bound` });
    }
    req.rateRangeQuery = `l.rate between ${minRate} and ${maxRate}`;
  }

  if (sort !== undefined && order !== undefined) {
    const sortableFields = req.sortableFields,
      orders = ['asc', 'desc'];

    if (sortableFields === undefined) {
      return res.status(400).json({ message: `No sortable fields` });
    }

    if (!sortableFields.includes(sort)) {
      return res.status(400).json({
        message: `'sort' query parameter is invalid`,
        fields: sortableFields,
      });
    }

    if (!orders.includes(order)) {
      return res.status(400).json({
        message: `'order' query parameter is invalid`,
        types: orders,
      });
    }

    req.orderQuery = `order by ${sort} ${order}`;
  }

  if (page !== undefined && limit !== undefined) {
    if (isNaN(parseInt(page)) || isNaN(parseInt(limit))) {
      return res.status(400).json({ message: `'page' or 'limit' is not a number` });
    }
    req.pageQuery = `limit ${limit} offset ${(page - 1) * limit}`;
    // req.query.limit = limit;
    // req.query.offset = (page - 1) * limit;
  }

  next();
}

export function getProductSortFields(req, res, next) {
  if (req.query.sort !== undefined && req.query.order !== undefined) {
    req.sortableFields = ['product_id', 'product_name'];
  }
  next();
}
