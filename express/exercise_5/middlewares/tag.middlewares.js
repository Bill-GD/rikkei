import { TagModel } from '../models/index.js';

export async function hasTagId(req, res, next) {
  const hasTag = await TagModel.has(req.params.id || -1);
  if (!hasTag) {
    return res.status(404).json({ message: 'No tag found' });
  }
  next();
}

export async function hasTagName(req, res, next) {
  const hasTag = await TagModel.has(-1, req.body.name);
  if (hasTag) {
    return res.status(403).json({ message: 'Tag already exists' });
  }
  next();
}

export function handleTagQuery(req, res, next) {
  if (req.params.id !== undefined && isNaN(parseInt(req.params.id))) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  let { productId, sort, order, page, limit } = req.query;

  if (productId !== undefined) {
    if (isNaN(parseInt(productId))) {
      return res.status(400).json({ message: `'productId' is not a number` });
    }
    req.query.productId = +productId;
  }

  if (sort !== undefined && order !== undefined) {
    const sortableFields = ['tag_id', 'content'],
      orders = ['asc', 'desc'];

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

export async function isTagInUse(req, res, next) {
  const inUse = await TagModel.isInUse(req.params.id);
  if (inUse) return res.status(403).json({ message: 'Tag is currently in use' });
  next();
}
