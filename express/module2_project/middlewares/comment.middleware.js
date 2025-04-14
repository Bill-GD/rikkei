import CommentService from '../service/comment.service.js';

export async function commentExists(req, res, next) {
  const hasComment = await CommentService.hasComment(req.params.id);
  if (!hasComment) {
    res.status(403).json({ message: `Comment not found` });
    return;
  }
  next();
}
