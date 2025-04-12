import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/auth.middlewares.js';
import { shouldEmailExists } from '../middlewares/user.middlewares.js';

const router = express.Router();

router.post('/register', validateBody, shouldEmailExists(false), AuthController.register);
router.post('/login', shouldEmailExists(true), AuthController.login);

export default router;
