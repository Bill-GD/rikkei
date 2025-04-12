import express from 'express';
import UserController from '../controllers/user.controller.js';
import { authenticate, authorize, getTokenFromCookie } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.get('/', getTokenFromCookie, authenticate, authorize(['admin']), UserController.getUsers);

export default router;
