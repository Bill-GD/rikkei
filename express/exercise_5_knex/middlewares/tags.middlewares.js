import db from '../config/database.js';

export function checkTagGetQueries(req, res, next) {
  let { productId, page, limit, sort, order } = req.query;
  const tagSortFields = ['tag_id', 'name'];

  if (productId) {
    if (isNaN(+productId) || +productId <= 0) {
      return res.status(400).json({
        message: 'Invalid product id',
        product_id: productId,
      });
    }
    req.query.product_id = +productId;
  }

  if (page && limit) {
    if (isNaN(+page) || isNaN(+limit) || +page <= 0 || +limit <= 0) {
      return res.status(400).json({
        message: 'Invalid pagination queries',
        page: page,
        limit: limit,
      });
    }
    req.query.page = +page;
    req.query.limit = +limit;
  }

  if (sort && order) {
    if (!tagSortFields.includes(sort)) {
      return res.status(400).json({
        message: 'Invalid sort query',
        values: tagSortFields,
      });
    }

    if (!['asc', 'desc'].includes(order)) {
      return res.status(400).json({
        message: 'Invalid order query',
        values: ['asc', 'desc'],
      });
    }
  }

  next();
}

export async function hasTagOfId(req, res, next) {
  const [{ count }] = await db('tag').count('* as count').where({ tag_id: req.params.id });
  if (count > 0) return next();
  res.status(404).json({ message: 'Tag not found' });
}

export async function hasTagWithName(req, res, next) {
  const [{ count }] = await db('tag').count('* as count').where({ name: req.body.name });
  if (count <= 0) return next();
  res.status(403).json({ message: 'Tag already exists' });
}
