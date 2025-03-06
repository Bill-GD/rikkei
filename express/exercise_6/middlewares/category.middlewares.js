import { CategoryService } from '../services/index.js';

export function getSortFields(req, res, next) {
  req.query.sortFields = ['category_id', 'category_name'];
  req.query.defaultSortField = 'category_id';
  next();
}

export async function checkId(req, res, next) {
  return await CategoryService.hasCategory({ id: req.params.id });
}
