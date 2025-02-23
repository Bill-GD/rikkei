import express from 'express';
import { UserController } from '../controllers/index.js';
import {
  singleInterestToArray, checkPageQuery, checkSortQuery,
  hasUserById, hasUserByEmail,
  zipcodeExists, companyExists, checkNewUserFields, checkUpdateUserFields, getUserSortFields,
} from '../middlewares/index.js';

const router = express.Router();

router.get('/', singleInterestToArray, checkPageQuery, getUserSortFields, checkSortQuery, UserController.getAll);
router.get('/:id', hasUserById, UserController.getById);
router.post('/', singleInterestToArray, hasUserByEmail, zipcodeExists, companyExists, checkNewUserFields, UserController.addUser);
router.put('/:id', hasUserById, singleInterestToArray, checkUpdateUserFields, UserController.updateUser);
router.delete('/:id', hasUserById, UserController.deleteUser);

export default router;
