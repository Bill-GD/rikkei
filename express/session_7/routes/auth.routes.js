import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', validateBody, AuthController.register);
router.post('/sign-in', AuthController.signin);

export default router;
