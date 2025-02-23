import { AddressModel, CompanyModel, UserModel } from '../models/index.js';

export async function hasUserById(req, res, next) {
  const reqId = req.params.id || req.body.userId;
  if (await UserModel.hasUserId(reqId)) {
    next();
    return;
  }
  res.status(404).json({ message: 'User not found' });
}

export async function hasUserByEmail(req, res, next) {
  const reqEmail = req.body.email;

  if (!reqEmail) {
    return res.status(400).json({ message: 'Email not provided' });
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

export function getUserSortFields(req, res, next) {
  if (req.query.sort !== undefined && req.query.order !== undefined) {
    req.sortableFields = ['id', 'name', 'username', 'email', 'phone', 'website'];
  }
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
