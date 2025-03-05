import { AuthorService } from '../services/author.service.js';
import { CategoryService } from '../services/category.service.js';
import { BookService } from '../services/index.js';
import { invalidRequest } from '../utils/helper.utils.js';

export async function checkId(req, res, next) {
  const id = req.params.id;
  const hasBook = await BookService.hasBook({ id });
  if (hasBook) return next();
  invalidRequest(res, 404, 'Book not found', { id });
}

export async function checkName(req, res, next) {
  const title = req.body.title;
  const hasBook = await BookService.hasBook({ title });
  if (!hasBook) return next();
  invalidRequest(res, 403, 'Book already exists', { title });
}

export function getSortFields(req, res, next) {
  req.query.sortFields = ['book_id', 'title', 'price', 'rate'];
  req.query.defaultSortField = 'book_id';
  next();
}

export async function handleQuery(req, res, next) {
  let { minRate, maxRate, minPrice, maxPrice, authorName } = req.query;
  if (!req.query.params) req.query.params = {};

  if (minRate && maxRate) {
    minRate = +minRate;
    maxRate = +maxRate;
    if (isNaN(minRate) || isNaN(maxRate)) {
      return invalidRequest(res, 400, 'minRate or maxRate is invalid', { values: { minRate, maxRate } });
    }

    if (minRate < 0 || minRate > 5 || maxRate < 0 || maxRate > 5 || minRate > maxRate) {
      return invalidRequest(res, 400, 'minRate or maxRate is out of bound', { values: { minRate, maxRate } });
    }

    req.query.params.rateRange = [minRate, maxRate];
  }

  if (minPrice && maxPrice) {
    minPrice = +minPrice;
    maxPrice = +maxPrice;

    if (isNaN(minPrice) || isNaN(maxPrice)) {
      return invalidRequest(res, 400, 'minPrice or maxPrice is invalid', { values: { minPrice, maxPrice } });
    }

    if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice) {
      return invalidRequest(res, 400, 'minPrice or maxPrice is out of bound', { values: { minPrice, maxPrice } });
    }

    req.query.params.priceRange = [minPrice, maxPrice];
  }

  if (authorName) req.query.params.authorName = authorName;
  next();
}

export async function checkPost(req, res, next) {
  let { title, authorName, categoryId, price, rate } = req.body;
  if (!req.postParams) req.postParams = {};

  req.postParams.price = 0;
  req.postParams.rate = 0;

  if (authorName) {
    const hasAuthor = await AuthorService.hasAuthor({ name: authorName });
    if (!hasAuthor) {
      return invalidRequest(res, 404, 'Author not found', { name: authorName });
    }
    req.postParams.author_id = (await AuthorService.getAuthor({ name: authorName })).author_id;
  }

  if (categoryId) {
    const hasCategory = await CategoryService.hasCategory({ id: categoryId });
    if (!hasCategory) {
      return invalidRequest(res, 404, 'Category not found', { id: categoryId });
    }
    req.postParams.category_id = +categoryId;
  } else {
    return invalidRequest(res, 400, 'Category ID not provided');
  }

  if (price) {
    if (isNaN(+price) || +price <= 0) {
      return invalidRequest(res, 400, 'Invalid price', { price });
    }
    req.postParams.price = +price;
  }

  if (rate) {
    if (isNaN(+rate) || +rate <= 0) {
      return invalidRequest(res, 400, 'Invalid rate', { rate });
    }
    req.postParams.rate = +rate;
  }

  req.postParams.title = title;

  next();
}

export async function checkNewReviewPost(req, res, next) {
  const { content } = req.body;
  if (!content || content.length <= 0) {
    return invalidRequest(res, 400, `Content can't be empty`);
  }
  next();
}
