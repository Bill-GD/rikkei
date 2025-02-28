import db from '../config/database.js';

export class CommentController {
  static async getAll(req, res) {
    try {
      let { product_id, page, limit, sort, order } = req.query;
      const query = db('comment')
        .orderBy(sort || 'comment_id', order)
        .limit(limit)
        .offset((page - 1) * limit);
      if (product_id) query.where({ product_id: product_id });

      const comments = await query;
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async getCommentOfId(req, res) {
    try {
      const [comment] = await db('comment').where({ comment_id: req.params.id });
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async updateCommentOfId(req, res) {
    try {
      await db('comment').where({ comment_id: req.params.id }).update({ content: req.body.content });
      res.json({ message: 'Updated comment of id' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }

  static async deleteCommentOfId(req, res) {
    try {
      await db('comment').where({ comment_id: req.params.id }).del();
      await db.raw('call reset_auto_increment(?,?)', ['comment', 'comment_id']);
      res.json({ message: 'Deleted comment of id' });
    } catch (error) {
      res.status(500).json({ message: 'An error has occurred', error });
    }
  }
}
