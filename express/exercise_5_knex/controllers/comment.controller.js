export class CommentController {
  static async getAll(req, res) {
    res.json({ message: 'Get all comments' });
  }

  static async getCommentOfId(req, res) {
    res.json({ message: 'Get comment of id' });
  }

  static async updateCommentOfId(req, res) {
    res.json({ message: 'Updated comment of id' });
  }

  static async deleteCommentOfId(req, res) {
    res.json({ message: 'Deleted comment of id' });
  }
}
