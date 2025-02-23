import { AlbumModel, PhotoModel } from '../models/index.js';

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

  static getAllPhotos(req, res) {
    const albumId = req.params.id;

    // TODO: possible to merge the 2 features
    if (req.getSorted) {
      PhotoModel.getSorted(albumId, req.sortQuery.sort, req.sortQuery.order).then(photos => {
        res.json(photos.map(e => e.toJson()));
      });
    } else {
      PhotoModel.getAll(albumId).then(photos => {
        const jsonList = photos.map(e => e.toJson());

        if (req.getPage) {
          const startIdx = (req.pageQuery.page - 1) * req.pageQuery.limit,
            endIdx = startIdx + req.pageQuery.limit;
          return res.json(jsonList.slice(startIdx, endIdx));
        }

        res.json(jsonList);
      });
    }
  }
}
