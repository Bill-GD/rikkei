import express from 'express';
import CommentController from '../controllers/comment.controller.js';
import PostController from '../controllers/post.controller.js';
import { authenticate, getTokenFromCookie } from '../middlewares/auth.middleware.js';
import { handlePaging, handleSorting } from '../middlewares/other.middleware.js';
import {
  checkDeletePostPermission, checkUpdatePostPermission, handleQueries, postExists, uploadSingleFile,
} from '../middlewares/post.middleware.js';

const router = express.Router();

router.use(getTokenFromCookie, authenticate);
router.get('/',
  handleQueries,
  handlePaging,
  handleSorting(['post_id', 'like_count', 'date_created']),
  PostController.getPosts,
);
router.get('/:id', postExists, PostController.getPost);
router.post('/', uploadSingleFile('image'), PostController.createPost);
router.put('/:id/like', postExists, PostController.likePost);
router.put('/:id', postExists, checkUpdatePostPermission, PostController.updatePostContent);
router.delete('/:id', postExists, checkDeletePostPermission, PostController.deletePost);

router.get('/:id/comments', postExists, CommentController.getPostComments);
router.post('/:id/comments', postExists, CommentController.postComment);

export default router;
