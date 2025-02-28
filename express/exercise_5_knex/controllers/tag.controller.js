export class TagController {
  static async getAll(req, res) {
    res.json({ message: 'Get all tags' });
  }

  static async addTag(req, res) {
    res.json({ message: 'Added new tag' });
  }

  static async getTagOfId(req, res) {
    res.json({ message: 'Get tag of id' });
  }

  static async updateTagOfId(req, res) {
    res.json({ message: 'Updated tag of id' });
  }

  static async deleteTagOfId(req, res) {
    res.json({ message: 'Deleted tag of id' });
  }

  static async getProductsOfTagId(req, res) {
    res.json({ message: 'Get all products with tag of id' });
  }
}
