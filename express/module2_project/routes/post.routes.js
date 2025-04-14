import express from 'express';
import PostController from '../controllers/post.controller.js';
import { authenticate, getTokenFromCookie } from '../middlewares/auth.middleware.js';
import { handlePaging, handleSorting } from '../middlewares/other.middleware.js';
import {
  checkDeletePostPermission, checkUpdatePostPermission, handleQueries, postExists, uploadSingleFile,
} from '../middlewares/post.middleware.js';

const router = express.Router();

router.get('/',
  getTokenFromCookie,
  authenticate,
  handleQueries,
  handlePaging,
  handleSorting(['post_id', 'like_count', 'date_created']),
  PostController.getPosts,
);
router.get('/:id', getTokenFromCookie, authenticate, postExists, PostController.getPost);
router.post('/', getTokenFromCookie, authenticate, uploadSingleFile('image'), PostController.createPost);
router.put('/:id/like', getTokenFromCookie, authenticate, postExists, PostController.likePost);
router.put('/:id',
  getTokenFromCookie,
  authenticate,
  postExists,
  checkUpdatePostPermission,
  PostController.updatePostContent,
);
router.delete('/:id',
  getTokenFromCookie,
  authenticate,
  postExists,
  checkDeletePostPermission,
  PostController.deletePost,
);

export default router;
