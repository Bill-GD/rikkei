export function hasUserByEmail(req, res) {

}

export function hasUserById(req, res) {

}

export function checkInterestRequest(req, res, next) {
  if (req.query.interests) {
    if (typeof req.query.interests === 'string') req.query.interests = [req.query.interests];
  }
  next();
}

export function checkPageRequest(req, res, next) {
  if (req.query.page !== undefined && req.query.limit !== undefined) {
    const [page, limit] = [parseInt(req.query.page), parseInt(req.query.limit)];
    if (isNaN(page) || isNaN(limit)) {
      return res.status(400).json({ message: `'page' or 'limit' is not a number` });
    }

    req.pageQuery = { page, limit };
    req.getPage = true;
  }
  next();
}

export function checkSortRequest(req, res, next) {
  if (req.query.sort !== undefined && req.query.order !== undefined) {
    const sortableFields = ['id', 'name', 'username', 'email', 'phone', 'website'],
      orders = ['asc', 'desc'];

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

    req.sortQuery = { sort: req.query.sort, order: req.query.order };
    req.getSorted = true;
  }

  // console.log(req.query);
  next();
}
