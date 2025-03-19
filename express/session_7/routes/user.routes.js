import express from 'express';
import UserController from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, authorize(['admin']), UserController.getAll);

router.get('/:id', authenticate, authorize(['admin', 'user']), UserController.getOne);

router.post('/', UserController.createOne);

router.put('/:id', UserController.updateOne);

router.delete('/:id', UserController.deleteOne);

export default router;
