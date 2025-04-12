import express from 'express';
import UserController from '../controllers/user.controller.js';
import { authenticate, authorize, getTokenFromCookie } from '../middlewares/auth.middlewares.js';
import { checkDeleteUserPermission, shouldUserIdExists } from '../middlewares/user.middlwares.js';

const router = express.Router();

router.get('/', getTokenFromCookie, authenticate, authorize(['admin']), UserController.getUsers);
router.get('/:id', getTokenFromCookie, authenticate, shouldUserIdExists(true), UserController.getUser);

router.delete('/:id', getTokenFromCookie, authenticate, checkDeleteUserPermission, shouldUserIdExists(true), UserController.deleteUser);

export default router;
