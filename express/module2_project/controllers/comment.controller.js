import CommentService from '../service/comment.service.js';
import { requestError } from '../utils/responses.js';

export default class CommentController {
  static async getPostComments(req, res) {
    res.status(200).json((await CommentService.getCommentsOf(req.params.id)).map(e => e.toJson()));
  }

  static async getAllComments(req, res) {
    res.status(200).json((await CommentService.getComments()).map(e => e.toJson()));
  }

  static async postComment(req, res) {
    const nextId = await CommentService.getNextId(),
      content = req.body?.content?.trim();

    if (!content) return requestError(res, `Comment content wasn't provided`);

    await CommentService.addComment(nextId, req.params.id, req.authenticatedUser.userId, content);
    res.status(201).json({
      message: 'Comment added successfully',
      id: nextId,
    });
  }

  static async deleteComment(req, res) {
    await CommentService.deleteComment(req.params.id);
    res.status(200).json({ message: 'Comment deleted successfully' });
  }
}
