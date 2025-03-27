import express from 'express';
import UserController from '../controllers/user.js';
import { authenticate, getTokenFromCookie } from '../middlewares/auth.js';
import uploader from '../utils/multer-uploader.js';

const router: express.Router = express.Router();

router.post('/:id/avatar', getTokenFromCookie, authenticate, uploader.single('avatar'), UserController.updateAvatar);

export default router;
