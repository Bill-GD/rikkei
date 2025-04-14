import express from 'express';
import UserController from '../controllers/user.controller.js';
import { authenticate, authorize, getTokenFromCookie } from '../middlewares/auth.middleware.js';
import {
  checkDeleteUserPermission, checkUpdateUserPermission, shouldUserIdExists,
} from '../middlewares/user.middleware.js';

const router = express.Router();

router.use(getTokenFromCookie, authenticate);
router.get('/', authorize(['admin']), UserController.getUsers);
router.get('/:id', shouldUserIdExists(true), UserController.getUser);
router.put('/:id', checkUpdateUserPermission, UserController.updateUser);
router.delete('/:id', checkDeleteUserPermission, shouldUserIdExists(true), UserController.deleteUser);

export default router;
