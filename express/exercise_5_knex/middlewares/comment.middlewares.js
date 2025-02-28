import db from '../config/database.js';

export function checkCommentGetQueries(req, res, next) {
  let { productId, page, limit, sort, order } = req.query;
  const commentSortFields = ['comment_id', 'content'];

  if (productId) {
    if (isNaN(+productId) || +productId < 0) {
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
  } else {
    req.query.page = 1;
    req.query.limit = 10;
  }

  if (sort && order) {
    if (!commentSortFields.includes(sort)) {
      return res.status(400).json({
        message: 'Invalid sort query',
        values: commentSortFields,
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

export async function hasCommentOfId(req, res, next) {
  const [{ count }] = await db('comment').count('* as count').where({ comment_id: req.params.id });
  if (count > 0) return next();
  res.status(404).json({ message: 'Comment not found' });
}
