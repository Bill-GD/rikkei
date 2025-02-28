import express from 'express';
import { CommentController } from '../controllers/index.js';
import { checkCommentGetQueries, hasCommentOfId } from '../middlewares/index.js';

const router = express.Router();

router.get('/', checkCommentGetQueries, CommentController.getAll);
router.get('/:id', hasCommentOfId, CommentController.getCommentOfId);
router.put('/:id', hasCommentOfId, CommentController.updateCommentOfId);
router.delete('/:id', hasCommentOfId, CommentController.deleteCommentOfId);

export default router;
