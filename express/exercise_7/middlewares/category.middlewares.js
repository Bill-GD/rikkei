import { CategoryService } from '../services/index.js';
import { invalidRequest } from '../utils/helper.js';

export function getCategorySortFields(req, res, next) {
  if (!req.sorting) req.sorting = {};
  req.sorting.fields = ['category_id', 'category_name'];
  req.sorting.sort = 'category_id';
  req.sorting.order = 'asc';
  next();
}

export async function checkCategory(req, res, next) {
  const { category } = req.query, { id } = req.params;
  if (!category && !id) return next();

  const has = await CategoryService.hasCategory(id, category);
  if (has) return next();
  invalidRequest(res, 404, 'Category not found', { category });
}

export async function checkDuplicate(req, res, next) {
  const { categoryName } = req.body;
  if (!categoryName) return invalidRequest(res, 400, 'Category name not provided');

  const has = await CategoryService.hasCategory(undefined, categoryName);
  if (!has) return next();
  invalidRequest(res, 404, 'Category already exists', { categoryName });
}
