import express from 'express';
import UserController from '../controllers/user.controller.js';
import { checkInterestRequest, checkPageRequest, checkSortRequest } from '../middlewares/user.middleware.js';

const router = express.Router();

router.get('/', checkInterestRequest, checkPageRequest, checkSortRequest, UserController.getAll);

export default router;
