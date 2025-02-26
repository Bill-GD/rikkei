import db from '../database/database.js';
import { CommentModel, ProductModel, TagModel } from '../models/index.js';
import { ListingModel } from '../models/listing.model.js';

export class ProductController {
  static async getAll(req, res) {
    res.json((await ProductModel.getAll()).map(e => e.toJson()));
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
}
