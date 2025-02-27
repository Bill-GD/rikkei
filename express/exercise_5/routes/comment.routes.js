import express from 'express';
import { CommentController } from '../controllers/index.js';
import { handleCommentQuery, hasComment } from '../middlewares/index.js';

const router = express.Router();

router.get('/', handleCommentQuery, CommentController.getAll);
router.get('/:id', hasComment, CommentController.getOfId);

router.put('/:id', hasComment, CommentController.updateComment);

router.delete('/:id', hasComment, CommentController.deleteComment);

export default router;
