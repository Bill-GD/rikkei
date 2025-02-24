import { AlbumModel, PhotoModel } from '../models/index.js';

export class AlbumController {
  static getAll(req, res) {
    AlbumModel.getAll(
      req.query.userId || -1,
      req.query.sort || 'id',
      req.query.order || 'asc',
      req.query.page || -1,
      req.query.limit || -1,
    ).then(albums => {
      res.json(albums.map(e => e.toJson()));
    });
  }

  static getById(req, res) {
    AlbumModel.get(req.params.id).then(album => {
      res.json(album.toJson());
    });
  }

  static async addAlbum(req, res) {
    const reqData = { ...req.body };

    const newData = {
      userId: reqData.userId,
      title: reqData.title,
    };

    const insertId = await AlbumModel.add(newData);
    res.status(201).json({ message: 'Album created successfully', id: insertId });
  }

  static async updateAlbum(req, res) {
    await AlbumModel.update(req.params.id, req.body.title);
    res.json({ message: 'Album title updated successfully' });
  }

  static deleteAlbum(req, res) {
    AlbumModel.delete(req.params.id).then(() => {
      res.json({ message: 'User deleted successfully' });
    });
  }

  static getAllPhotos(req, res) {
    PhotoModel.getAll(
      req.params.id,
      req.query.sort || 'id',
      req.query.order || 'asc',
      req.query.page || -1,
      req.query.limit || -1,
    ).then(photos => {
      res.json(photos.map(e => e.toJson()));
    });
  }
}
