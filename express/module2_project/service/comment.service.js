import db from '../config/db.js';
import CommentModel from '../models/comment.model.js';

export default class CommentService {
  static async getNextId() {
    return (await db('comment').max('comment_id as max'))[0].max + 1;
  }

  static async hasComment(id) {
    const result = await db('comment').where({ comment_id: id }).first();
    return !!result;
  }

  /**
   * @param postId
   * @returns {Promise<CommentModel[]>}
   */
  static async getCommentsOf(postId) {
    return (await db('comment').where({ post_id: postId })).map(CommentModel.fromJson);
  }

  static async addComment(commentId, postId, uploaderId, content) {
    await db('comment').insert({
      comment_id: commentId,
      uploader_id: uploaderId,
      post_id: postId,
      content,
    });
  }

  static async deleteComment(id) {
    await db('comment').where({ comment_id: id }).del();
  }
}
