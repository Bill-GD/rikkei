import { UserModel } from '../models/index.js';

export async function hasUserById(req, res, next) {
  const reqId = req.params.id;
  if (await UserModel.hasUserId(reqId)) {
    next();
    return;
  }
  res.status(404).json({ message: 'User not found' });
}

export async function hasUserByEmail(req, res, next) {
  const reqId = req.params.id;
  if (await UserModel.hasUserEmail(reqId)) {
    return res.status(403).json({ message: 'User with the same email already exist' });
  }
  next();
}

export function checkInterestRequest(req, res, next) {
  if (req.query.interests) {
    if (typeof req.query.interests === 'string') req.query.interests = [req.query.interests];
  }
  next();
}

export function checkPageRequest(req, res, next) {
  if (req.query.page !== undefined && req.query.limit !== undefined) {
    const [page, limit] = [parseInt(req.query.page), parseInt(req.query.limit)];
    if (isNaN(page) || isNaN(limit)) {
      return res.status(400).json({ message: `'page' or 'limit' is not a number` });
    }

    req.pageQuery = { page, limit };
    req.getPage = true;
  }
  next();
}

export function checkSortRequest(req, res, next) {
  if (req.query.sort !== undefined && req.query.order !== undefined) {
    const sortableFields = ['id', 'name', 'username', 'email', 'phone', 'website'],
      orders = ['asc', 'desc'];

    if (!sortableFields.includes(req.query.sort)) {
      return res.status(400)
                .json({
                  message: `'sort' query parameter is invalid`,
                  fields: sortableFields,
                });
    }
    if (!orders.includes(req.query.order)) {
      return res.status(400)
                .json({
                  message: `'order' query parameter is invalid`,
                  types: orders,
                });
    }

    req.sortQuery = { sort: req.query.sort, order: req.query.order };
    req.getSorted = true;
  }

  // console.log(req.query);
  next();
}
