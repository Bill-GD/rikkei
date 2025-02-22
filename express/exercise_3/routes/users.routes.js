import express from 'express';
import { UserController } from '../controllers/index.js';
import {
  convertInterestArrayRequest, checkUserPageQuery, checkUserSortQuery,
  hasUserById,
  hasUserByEmail, zipcodeExists, companyExists, checkNewUserFields,
} from '../middlewares/user.middleware.js';

const router = express.Router();

router.get('/', convertInterestArrayRequest, checkUserPageQuery, checkUserSortQuery, UserController.getAll);
router.get('/:id', hasUserById, UserController.getById);
router.post('/', convertInterestArrayRequest, hasUserByEmail, zipcodeExists, companyExists, checkNewUserFields, UserController.addUser);

export default router;
