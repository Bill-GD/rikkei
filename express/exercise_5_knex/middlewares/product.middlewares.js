import db from '../config/database.js';

export function checkProductGetQueries(req, res, next) {
  let { minRate, maxRate, page, limit, sort, order } = req.query;
  const productSortFields = ['product_id', 'product_name'],
    listingSortFields = ['price', 'rate'];

  if (minRate && maxRate) {
    if (isNaN(+minRate) || isNaN(+maxRate)) {
      return res.status(400).json({ message: 'Invalid rate queries' });
    }

    if (+maxRate < 0 || +maxRate > 5 || +minRate < 0 || +minRate > 5 || +minRate > +maxRate) {
      return res.status(400).json({
        message: 'Rate queries are out of bound',
        minRate: +minRate,
        maxRate: +maxRate,
      });
    }
  }

  if (page && limit && (isNaN(+page) || isNaN(+limit) || +page <= 0 || +limit <= 0)) {
    return res.status(400).json({
      message: 'Invalid pagination queries',
      page: +page,
      limit: +limit,
    });
  }

  if (sort && order) {
    if (![...productSortFields, ...listingSortFields].includes(sort)) {
      return res.status(400).json({
        message: 'Invalid sorting field',
        fields: [...productSortFields, ...listingSortFields],
      });
    }
    if (productSortFields.includes(sort)) req.query.sort = `p.${sort}`;
    if (listingSortFields.includes(sort)) req.query.sort = `l.${sort}`;

    if (!['asc', 'desc'].includes(order)) {
      return res.status(400).json({
        message: 'Invalid order query',
        values: ['asc', 'desc'],
      });
    }
  }

  next();
}

export async function hasProductOfId(req, res, next) {
  const [{ count }] = await db('product').count('* as count').where({ product_id: req.params.id });
  if (count > 0) return next();
  res.status(404).json({ message: 'Product not found' });
}

export function checkAddProductBody(req, res, next) {
  let { product_name, description, price, rate } = req.body;

  if (!product_name) {
    return res.status(400).json({ message: 'Product name not provided' });
  }

  if (price) {
    if (isNaN(+price) || +price <= 0) {
      return res.status(400).json({ message: 'Invalid price', price: +price });
    }
    req.body.price = +price;
  }

  if (rate) {
    if (isNaN(+rate) || +rate <= 0) {
      return res.status(400).json({ message: 'Invalid rate', rate: +rate });
    }
    req.body.rate = +rate;
  }

  req.body.description = description || '';
  req.body.price = price || 0;
  req.body.rate = rate || 0;

  next();
}

export function checkUpdateProductBody(req, res, next) {
  const { product_name, status, description, price, rate } = req.body;
  req.body.product = {}, req.body.listing = {};

  if (status) {
    if (['1', 'true'].includes(status.toLowerCase())) req.body.status = true;
    else if (['0', 'false'].includes(status.toLowerCase())) req.body.status = false;
    else {
      return res.status(400).json({
        message: 'Invalid status provided',
        values: ['1', 'true', '0', 'false'],
      });
    }
  }

  if (price) {
    if (isNaN(+price) || +price <= 0) {
      return res.status(400).json({ message: 'Invalid price', price: +price });
    }
    req.body.price = +price;
  }

  if (rate) {
    if (isNaN(+rate) || +rate <= 0) {
      return res.status(400).json({ message: 'Invalid rate', rate: +rate });
    }
    req.body.rate = +rate;
  }

  if (product_name) req.body.product.product_name = product_name;
  if (status) req.body.product.status = status;
  if (description) req.body.listing.description = description;
  if (price) req.body.listing.price = price;
  if (rate) req.body.listing.rate = rate;

  if (Object.keys(req.body.product).length <= 0) req.body.product = undefined;
  if (Object.keys(req.body.listing).length <= 0) req.body.listing = undefined;

  next();
}

export async function hasProductWithName(req, res, next) {
  const [{ count }] = await db('product').count('* as count').where({ product_name: req.body.product_name });
  if (count <= 0) return next();
  res.status(404).json({ message: 'Product already exists' });
}
