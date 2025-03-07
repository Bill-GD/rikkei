import { CategoryService, LocationService, SkillService } from '../services/index.js';
import { invalidRequest } from '../utils/helper.js';

/**
 * Will handle the pagination and sorting.
 * If sorting, a list of sortable fields must be provided through `req.sorting.fields`.
 */
export async function handlePageAndSort(req, res, next) {
  let { page, limit, sort, order } = req.query;

  if (sort && order) {
    if (!req.sorting) req.sorting = {};

    if (!req.sorting.fields) {
      return invalidRequest(res, 501, 'No sortable field found');
    }

    if (!req.sorting.fields.includes(sort)) {
      return invalidRequest(res, 400, 'Field not sortable', { values: req.sorting.fields });
    }
    req.sorting.sort = sort;

    if (!['asc', 'desc'].includes(order)) {
      return invalidRequest(res, 400, 'Invalid order keyword', { values: ['asc', 'desc'] });
    }
    req.sorting.order = order;
  }

  if (page && limit) {
    if (!req.paging) req.paging = {};

    if (isNaN(+page) || isNaN(+limit) || +limit < 0 || +page < 0) {
      return invalidRequest(res, 400, 'Invalid page or limit', { page, limit });
    }

    req.paging.limit = limit;
    req.paging.offset = `${(page - 1) * limit}`;
  }

  next();
}

export async function hasLocation(req, res, next) {
  const { location } = req.query;
  if (!location) return next();

  const has = await LocationService.hasLocation(location);
  if (has) return next();
  invalidRequest(res, 404, 'Location not found', { location });
}

export async function checkSkills(req, res, next) {
  const { skill } = req.query;
  if (!skill) return next();

  for (const s of skill) {
    if (!(await SkillService.hasSkill(s))) {
      return invalidRequest(res, 404, 'Skill not found', { skill: s });
    }
  }
  next();
}

export async function hasCategory(req, res, next) {
  const { category } = req.query;
  if (!category) return next();

  const has = await CategoryService.hasCategory(category);
  if (has) return next();
  invalidRequest(res, 404, 'Category not found', { category });
}
