import express from 'express';
import AuthController from '../controllers/auth.js';
import { authenticate, validateBody } from '../middlewares/auth.js';
import upload from '../utils/multer-uploader.js';

const router: express.Router = express.Router();

// multer helps putting form-data text fields into `req.body`
router.post('/register', upload.single('avatar'), validateBody, AuthController.register);

export default router;
