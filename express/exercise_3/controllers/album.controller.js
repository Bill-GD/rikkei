import { AlbumModel } from '../models/index.js';

export class AlbumController {
  static getAll(req, res) {
    if (req.query.userId) {
      AlbumModel.getAll().then(albums => {
        res.json(albums.map(e => e.toJson()).filter(e => e.userId === parseInt(req.query.userId)));
      });
      return;
    }

    if (req.getPage) {
      AlbumModel.getAllByPage(req.pageQuery.page, req.pageQuery.limit).then(albums => {
        res.json(albums.map(e => e.toJson()));
      });
      return;
    }

    if (req.getSorted) {
      AlbumModel.getSorted(req.sortQuery.sort, req.sortQuery.order).then(albums => {
        res.json(albums.map(e => e.toJson()));
      });
      return;
    }

    AlbumModel.getAll().then(albums => {
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
}
