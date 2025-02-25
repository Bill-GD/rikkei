import { AddressModel, CompanyModel, UserModel } from '../models/index.js';
import mysql from 'mysql2';

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

export function getUserSortFields(req, res, next) {
  if (req.query.sort !== undefined && req.query.order !== undefined) {
    req.sortableFields = ['id', 'name', 'username', 'email', 'phone', 'website'];
  }
  next();
}

export function getUserAlbumSortFields(req, res, next) {
  if (req.query.sort !== undefined && req.query.order !== undefined) {
    req.sortableFields = ['id', 'title'];
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

export function handleUserQuery(req, res, next) {
  let { cities, sort, order, page, limit } = req.query;
  let baseQuery = 'select * from user',
    whereQuery = '', orderQuery = 'order by id asc', pageQuery = '';
  // SELECT > FROM > WHERE > GROUP BY > HAVING > ORDER BY > LIMIT > OFFSET
  console.log(`sort: ${sort}, order: ${order}, page: ${page}, limit: ${limit}, cities: ${cities} (${typeof cities})`);

  if (cities !== undefined && cities.length > 0) {
    // city = 'South Elvis' or city = 'McKenziehaven'
    const subQuery = mysql.format(
      `select id
       from address
       where ${cities.map(e => `city = ?`).join(' or ')}`,
      cities,
    );
    whereQuery = `where address_id in (${subQuery})`;
  }

  if (sort !== undefined && order !== undefined) {
    const sortableFields = req.sortableFields,
      orders = ['asc', 'desc'];

    if (sortableFields === undefined) {
      return res.status(400).json({ message: `No sortable fields` });
    }

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

    orderQuery = `order by ${sort} ${order}`;
  }

  if (page !== undefined && limit !== undefined) {
    if (isNaN(parseInt(page)) || isNaN(parseInt(limit))) {
      return res.status(400).json({ message: `'page' or 'limit' is not a number` });
    }
    pageQuery = `limit ${limit} offset ${(page - 1) * limit}`;
  }

  req.finalQuery = `${baseQuery} ${whereQuery} ${orderQuery} ${pageQuery}`;
  console.log(req.finalQuery);
  next();
}
