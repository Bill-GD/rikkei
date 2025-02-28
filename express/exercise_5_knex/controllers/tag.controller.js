export class TagController {
  static async getAll(req, res) {
    try {
      res.json({ message: 'Get all tags' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async addTag(req, res) {
    try {
      res.json({ message: 'Added new tag' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async getTagOfId(req, res) {
    try {
      res.json({ message: 'Get tag of id' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async updateTagOfId(req, res) {
    try {
      res.json({ message: 'Updated tag of id' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async deleteTagOfId(req, res) {
    try {
      res.json({ message: 'Deleted tag of id' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async getProductsOfTagId(req, res) {
    try {
      res.json({ message: 'Get all products with tag of id' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }
}
