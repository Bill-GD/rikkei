import express from 'express';
import CommentController from '../controllers/comment.controller.js';
import { authenticate, getTokenFromCookie } from '../middlewares/auth.middleware.js';
import { commentExists } from '../middlewares/comment.middleware.js';

const router = express.Router();

router.use(getTokenFromCookie, authenticate);
router.delete('/:id', commentExists, CommentController.deleteComment);

export default router;
