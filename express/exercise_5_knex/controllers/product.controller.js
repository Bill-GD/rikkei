export class ProductController {
  static async getAll(req, res) {
    res.json({ message: 'Get all products' });
  }

  static async getProductOfId(req, res) {
    res.json({ message: 'Get product of id' });
  }

  static async getListingOfId(req, res) {
    res.json({ message: 'Get listing of product id' });
  }

  static async getTagsOfId(req, res) {
    res.json({ message: 'Get tags of product id' });
  }

  static async getCommentsOfId(req, res) {
    res.json({ message: 'Get comments of product id' });
  }

  static async addProduct(req, res) {
    res.json({ message: 'Added new product' });
  }

  static async addCommentForProduct(req, res) {
    res.json({ message: 'Added new comment for product id' });
  }

  static async updateProductOfId(req, res) {
    res.json({ message: 'Updated product of id' });
  }

  static async deleteProductOfId(req, res) {
    res.json({ message: 'Deleted product of id' });
  }
}
