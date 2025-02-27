import { CommentModel, ProductModel, TagModel, ListingModel } from '../models/index.js';

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

  static async addComment(req, res) {
    await new CommentModel(-1, req.body.content).add(req.params.id);
    res.status(201).json({ message: `Added new comment for ${req.params.id}` });
  }

  static async updateProduct(req, res) {
    let { productName, desc, price, rate } = req.body;
    await ProductModel.update(req.params.id, {
      product_name: productName,
      listing: {
        description: desc,
        price: price ? +price : undefined,
        rate: rate ? +rate : undefined,
      },
    });
    res.json({ message: 'Updated product successfully' });
  }

  static async deleteProduct(req, res) {
    await ProductModel.delete(req.params.id);
    res.json({ message: 'Deleted product' });
  }
}
