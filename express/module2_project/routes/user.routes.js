import express from 'express';
import UserController from '../controllers/user.controller.js';
import { authenticate, authorize, getTokenFromCookie } from '../middlewares/auth.middlewares.js';
import {
  checkDeleteUserPermission, checkUpdateUserPermission, shouldUserIdExists,
} from '../middlewares/user.middlewares.js';

const router = express.Router();

router.get('/', getTokenFromCookie, authenticate, authorize(['admin']), UserController.getUsers);
router.get('/:id', getTokenFromCookie, authenticate, shouldUserIdExists(true), UserController.getUser);
router.put('/:id', getTokenFromCookie, authenticate, checkUpdateUserPermission, UserController.updateUser);
router.delete('/:id', getTokenFromCookie, authenticate, checkDeleteUserPermission, shouldUserIdExists(true), UserController.deleteUser);

export default router;
