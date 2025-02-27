import db from '../database/database.js';
import { CommentModel, ProductModel, TagModel } from '../models/index.js';
import { ListingModel } from '../models/listing.model.js';

export class ProductController {
  static async getAll(req, res) {
    res.json((await ProductModel.getAll(
      -1,
      req.rateRangeQuery,
      req.orderQuery,
      req.pageQuery,
    )).map(e => e.toJson()));
  }

  static async getId(req, res) {
    const reqProductId = req.params.id;
    res.json((await ProductModel.getAll(reqProductId))[0].toJson());
  }

  static async getListingOfId(req, res) {
    const reqProductId = req.params.id;
    res.json((await ListingModel.getAll(reqProductId)).map(e => e.toJson()));
  }

  static async getTagsOfId(req, res) {
    const reqProductId = req.params.id;
    res.json((await TagModel.getAll(-1, reqProductId)).map(e => e.toJson()));
  }

  static async getCommentsOfId(req, res) {
    const reqProductId = req.params.id;
    res.json((await CommentModel.getAll(-1, reqProductId)).map(e => e.toJson()));
  }

  static async addProduct(req, res) {
    const { productName, listing, tags } = req.body;
    const newId = await (new ProductModel(-1, productName, true, listing, tags || [], [])).add();
    res.status(201).json({ message: 'Added new product', id: newId });
  }

  static async deleteProduct(req, res) {
    await ProductModel.delete(req.params.id);
    res.json({ message: 'Deleted product' });
  }
}
