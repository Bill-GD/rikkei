import { AlbumModel } from '../models/index.js';

export function getAlbumSortFields(req, res, next) {
  if (req.query.sort !== undefined && req.query.order !== undefined) {
    req.sortableFields = ['id', 'user_id', 'title'];
  }
  next();
}

export function getAlbumPhotoSortFields(req, res, next) {
  if (req.query.sort !== undefined && req.query.order !== undefined) {
    req.sortableFields = ['id', 'title', 'url', 'thumbnail'];
  }
  next();
}

export async function hasAlbumId(req, res, next) {
  const reqId = req.params.id;
  if (await AlbumModel.hasAlbumOfId(reqId)) {
    next();
    return;
  }
  res.status(404).json({ message: 'Album not found' });
}

export async function hasAlbumTitle(req, res, next) {
  const reqTitle = req.body.title;
  if (reqTitle === undefined) {
    return res.status(400).json({ message: 'Title not provided' });
  }

  if (await AlbumModel.hasAlbumOfTitle(reqTitle)) {
    return res.status(403).json({ message: 'Album title already exists' });
  }
  next();
}

function handleAlbumQuery(req, res, next) {
  let { interests, sort, order, page, limit } = req.query;
  console.log(`sort: ${sort}, order: ${order}, page: ${page}, limit: ${limit}, interests: ${interests} (${typeof interests})`);

  if (page !== undefined && limit !== undefined) {
    if (isNaN(parseInt(page)) || isNaN(parseInt(limit))) {
      return res.status(400).json({ message: `'page' or 'limit' is not a number` });
    }
  }

  if (sort !== undefined && order !== undefined) {
    const sortableFields = req.sortableFields,
      orders = ['asc', 'desc'];

    if (sortableFields === undefined) {
      return res.status(400).json({ message: `No sortable fields` });
    }

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
  }
  next();
}
