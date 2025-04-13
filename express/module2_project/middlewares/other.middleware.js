import { requestError } from '../utils/responses.js';

export function handleSorting(fields) {
  return function (req, res, next) {
    const sort = req.query?.sort, order = req.query?.order;
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
