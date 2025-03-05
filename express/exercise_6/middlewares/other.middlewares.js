import { invalidRequest } from '../utils/helper.utils.js';

export async function handlePaginationAndSort(req, res, next) {
  if (!req.query.params) req.query.params = {};
  let { page, limit, sort, order } = req.query;

  if (page && limit) {
    if (isNaN(+page) || isNaN(+limit) || +page <= 0 || +limit <= 0) {
      return invalidRequest(res, 400, 'page or limit is invalid', { values: { page, limit } });
    }

    req.query.params.limit = limit;
    req.query.params.offset = `${(+page - 1) * +limit}`;
  }

  if (!sort) sort = req.query.defaultSortField;

  if (sort && order) {
    if (!req.query.sortFields) {
      return invalidRequest(res, 500, 'Sortable fields not provided');
    }

    if (!req.query.sortFields.includes(sort)) {
      return invalidRequest(res, 400, 'Invalid sort field', { values: req.query.sortFields });
    }

    if (!['asc', 'desc'].includes(order)) {
      return invalidRequest(res, 400, 'Invalid order field', { values: ['asc', 'desc'] });
    }

    req.query.params.sort = sort;
    req.query.params.order = order;
  }

  // console.log(req.query.params);
  next();
}
