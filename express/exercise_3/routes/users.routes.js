import express from 'express';
import UserController from '../controllers/user.controller.js';
import {
  checkInterestRequest,
  checkPageRequest,
  checkSortRequest,
  hasUserById,
  hasUserByEmail,
} from '../middlewares/user.middleware.js';

const router = express.Router();

router.get('/', checkInterestRequest, checkPageRequest, checkSortRequest, UserController.getAll);
router.get('/:id', hasUserById, UserController.getById);
router.post('/', hasUserByEmail, UserController.addUser);

export default router;
