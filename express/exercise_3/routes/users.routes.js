import express from 'express';
import { UserController } from '../controllers/index.js';
import {
  singleInterestToArray,
  checkUserPageQuery, checkUserSortQuery,
  hasUserById, hasUserByEmail,
  zipcodeExists, companyExists, checkNewUserFields, checkUpdateUserFields,
} from '../middlewares/user.middleware.js';

const router = express.Router();

router.get('/', singleInterestToArray, checkUserPageQuery, checkUserSortQuery, UserController.getAll);
router.get('/:id', hasUserById, UserController.getById);
router.post('/', singleInterestToArray, hasUserByEmail, zipcodeExists, companyExists, checkNewUserFields, UserController.addUser);
router.put('/:id', hasUserById, singleInterestToArray, checkUpdateUserFields, UserController.updateUser);
router.delete('/:id', hasUserById, UserController.deleteUser);

export default router;
