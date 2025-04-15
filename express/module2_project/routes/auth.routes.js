import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { authenticate, getTokenFromCookie, validateBody } from '../middlewares/auth.middleware.js';
import { shouldEmailExists } from '../middlewares/user.middleware.js';

const router = express.Router();

router.post('/register', validateBody, shouldEmailExists(false), AuthController.register);
router.post('/login', shouldEmailExists(true), AuthController.login);
router.post('/logout', getTokenFromCookie, authenticate, AuthController.logout);

export default router;
