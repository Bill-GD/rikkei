import { CommentModel } from '../models/index.js';

export async function hasComment(req, res, next) {
  const hasComment = await CommentModel.has(req.params.id || -1);
  if (!hasComment) {
    return res.status(404).json({ message: 'No comment found' });
  }
  next();
}

export function handleCommentQuery(req, res, next) {
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
    const sortableFields = ['comment_id', 'content'],
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
