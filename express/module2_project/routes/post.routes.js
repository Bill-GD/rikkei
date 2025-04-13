import express from 'express';
import PostController from '../controllers/post.controller.js';
import { authenticate, getTokenFromCookie } from '../middlewares/auth.middleware.js';
import { uploadSingleFile } from '../middlewares/post.middleware.js';

const router = express.Router();

router.post('/', getTokenFromCookie, authenticate, uploadSingleFile('image'), PostController.createPost);

export default router;
