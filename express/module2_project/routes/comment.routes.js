import express from 'express';
import CommentController from '../controllers/comment.controller.js';
import { authenticate, authorize, getTokenFromCookie } from '../middlewares/auth.middleware.js';
import { commentExists } from '../middlewares/comment.middleware.js';

const router = express.Router();

router.use(getTokenFromCookie, authenticate);
router.get('/', authorize(['admin']), CommentController.getAllComments);
router.delete('/:id', commentExists, CommentController.deleteComment);

export default router;
