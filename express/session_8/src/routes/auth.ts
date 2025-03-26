import express from 'express';
import AuthController from '../controllers/auth.js';
import { authenticate, getTokenFromCookie, shouldEmailExists, validateBody } from '../middlewares/auth.js';
import uploader from '../utils/multer-uploader.js';

const router: express.Router = express.Router();

// multer helps putting form-data text fields into `req.body`
router.post('/register', uploader.single('avatar'), shouldEmailExists(false), validateBody, AuthController.register);
router.post('/login', shouldEmailExists(true), AuthController.login);
router.post('/logout', getTokenFromCookie, authenticate, AuthController.logout);
router.post('/reset-password', getTokenFromCookie, authenticate, AuthController.resetPassword);

export default router;
