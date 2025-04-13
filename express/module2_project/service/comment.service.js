import db from '../config/db.js';
import CommentModel from '../models/comment.model.js';

export default class CommentService {
  /**
   * @param postId
   * @returns {Promise<CommentModel[]>}
   */
  static async getCommentsOf(postId) {
    return (await db('comment').where({ post_id: postId })).map(CommentModel.fromJson);
  }
}
