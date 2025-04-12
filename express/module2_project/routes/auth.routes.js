import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import { shouldEmailExists, validateBody } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.post('/register', validateBody, shouldEmailExists(false), AuthController.register);

export default router;
