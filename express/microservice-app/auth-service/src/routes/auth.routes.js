import express from 'express';
import AuthController from '../controllers/auth.controllers.js';
import { validateBody } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.post("/register", validateBody, AuthController.register);
router.post("/sign-in", AuthController.signIn);

export default router;
