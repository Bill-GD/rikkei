import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', UserController.getAll);

router.get('/:id', UserController.getOne);

router.post('/', UserController.createOne);

router.put('/:id', UserController.updateOne);

router.delete('/:id', UserController.deleteOne);

export default router;
