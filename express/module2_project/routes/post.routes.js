import express from 'express';
import PostController from '../controllers/post.controller.js';
import { authenticate, getTokenFromCookie } from '../middlewares/auth.middleware.js';
import { checkDeletePostPermission, postExists, uploadSingleFile } from '../middlewares/post.middleware.js';

const router = express.Router();

router.get('/', getTokenFromCookie, authenticate, PostController.getPosts);
router.get('/:id', getTokenFromCookie, authenticate, postExists, PostController.getPost);
router.post('/', getTokenFromCookie, authenticate, uploadSingleFile('image'), PostController.createPost);
router.delete('/:id', getTokenFromCookie, authenticate, postExists, checkDeletePostPermission, PostController.deletePost);

export default router;
