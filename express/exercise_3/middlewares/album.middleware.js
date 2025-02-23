import { AlbumModel } from '../models/index.js';

export function getAlbumSortFields(req, res, next) {
  if (req.query.sort !== undefined && req.query.order !== undefined) {
    req.sortableFields = ['id', 'user_id', 'title'];
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
