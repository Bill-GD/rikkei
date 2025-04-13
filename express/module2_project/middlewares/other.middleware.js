import { requestError } from '../utils/responses.js';

export function handlePaging(req, res, next) {
  let page = +req.query?.page, limit = +req.query?.limit;
  if (!isNaN(page) && !isNaN(limit)) {
    if (page < 1 || limit < 1) {
      return requestError(res, '`page` and `limit` value must be at least 1');
    }
    req.paging = {
      offset: (page - 1) * limit,
      limit,
    };
  }
  next();
}

export function handleSorting(fields) {
  return function (req, res, next) {
    const sort = req.query?.sort?.trim(), order = req.query?.order;
    if (sort && order) {
      if (!['asc', 'desc'].includes(order)) {
        return requestError(res, 'Order value must be one of: asc, desc');
      }
      if (!fields.includes(sort)) {
        return requestError(res, `Sort value must be one of: ${fields.join(', ')}`);
      }
      req.sorting = { sort, order };
    }
    next();
  };
}
