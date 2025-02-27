import { TagModel } from '../models/index.js';

export class TagController {
  static async getAll(req, res) {
    res.json((await TagModel.getAll(
      -1,
      req.query.productId,
      req.orderQuery,
      req.pageQuery,
    )).map(e => e.toJson()));
  }

  static async getOfId(req, res) {
    res.json((await TagModel.getAll(req.params.id))[0].toJson());
  }

  static async addTag(req, res) {
    const newId = await new TagModel(-1, req.body.name).add();
    res.status(201).json({ message: 'Tag added successfully', id: newId });
  }

  static async updateTag(req, res) {
    await TagModel.update(req.params.id, req.body.name);
    res.json({ message: 'Updated tag successfully' });
  }

  static async deleteTag(req, res) {
    await TagModel.delete(req.params.id);
    res.json({ message: 'Deleted tag successfully' });
  }

  static async getProducts(req, res) {
    res.json((await TagModel.getProducts(req.params.id)).map(e => e.toJson()));
  }
}
