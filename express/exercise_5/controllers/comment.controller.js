import { CommentModel } from '../models/index.js';

export class CommentController {
  static async getAll(req, res) {
    res.json((await CommentModel.getAll(
      -1,
      req.query.productId,
      req.orderQuery,
      req.pageQuery,
    )).map(e => e.toJson()));
  }

  static async getOfId(req, res) {
    res.json((await CommentModel.getAll(req.params.id))[0].toJson());
  }

  static async updateComment(req, res) {
    await CommentModel.update(req.params.id, req.body.content);
    res.json({ message: 'Updated comment successfully' });
  }

  static async deleteComment(req, res) {
    await CommentModel.delete(req.params.id);
    res.json({ message: 'Deleted comment successfully' });
  }
}
