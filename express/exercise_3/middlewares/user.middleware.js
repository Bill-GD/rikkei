import { AddressModel, CompanyModel, UserModel } from '../models/index.js';

export async function hasUserById(req, res, next) {
  const reqId = req.params.id;
  if (await UserModel.hasUserId(reqId)) {
    next();
    return;
  }
  res.status(404).json({ message: 'User not found' });
}

export async function hasUserByEmail(req, res, next) {
  const reqEmail = req.body.email;

  if (!reqEmail) {
    return res.status(400).json({ message: 'No email specified' });
  }

  if (await UserModel.hasUserEmail(reqEmail)) {
    return res.status(403).json({ message: 'User with the same email already exist' });
  }
  next();
}

/**
 * Converts interest request (body & param) into an array if single value is provided.
 * @param {Request<P, ResBody, ReqBody, ReqQuery, LocalsObj>} req
 * @param {Response<any, Record<string, any>>} res
 * @param {NextFunction} next
 */
export function singleInterestToArray(req, res, next) {
  if (req.query.interests) {
    if (typeof req.query.interests === 'string') req.query.interests = [req.query.interests];
  }
  if (req.body.interests) {
    if (typeof req.body.interests === 'string') req.body.interests = [req.body.interests];
  }
  next();
}

export function checkUserPageQuery(req, res, next) {
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

export function checkUserSortQuery(req, res, next) {
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

export function zipcodeExists(req, res, next) {
  const reqZip = req.body.zipcode;

  if (!reqZip) {
    return res.status(400).json({ message: 'No zipcode specified' });
  }

  AddressModel.hasAddressOfZip(reqZip).then(hasAddr => {
    if (hasAddr) {
      next();
      return;
    }
    res.status(404).json({ message: 'No address found with specified zipcode' });
  });
}

export function companyExists(req, res, next) {
  const reqComp = req.body.companyName;

  if (!reqComp) {
    return res.status(400).json({ message: 'No company specified' });
  }

  CompanyModel.hasCompanyOfName(reqComp).then(hasComp => {
    if (hasComp) {
      next();
      return;
    }
    res.status(404).json({ message: 'No company found with specified name' });
  });
}

export function checkNewUserFields(req, res, next) {
  const fields = ['name', 'username', 'email', 'zipcode', 'phone', 'website', 'companyName', 'interests'],
    providedKeys = Object.keys(req.body).filter(e => fields.includes(e)),
    missing = [];

  for (const field of fields) {
    if (!providedKeys.includes(field)) {
      missing.push(field);
    }
  }

  return missing.length > 0
    ? res.status(400).json({
      message: 'Requested body is invalid',
      fields: fields,
      missing: missing,
    })
    : next();
}

export function checkUpdateUserFields(req, res, next) {
  const fields = ['name', 'username', 'email', 'phone', 'website', 'interests'],
    newData = {};

  for (const field of fields) {
    newData[field] = req.body[field];
  }
  req.body = newData;
  return next();
}
