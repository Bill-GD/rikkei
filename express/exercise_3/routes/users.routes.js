import express from 'express';
import { UserController } from '../controllers/index.js';
import {
  hasUserById,
  hasUserByEmail,
  zipcodeExists,
  companyExists,
  checkNewUserFields,
  checkUpdateUserFields,
  getUserSortFields,
  getUserAlbumSortFields,
  handleUserQuery,
} from '../middlewares/index.js';

const router = express.Router();

router.get('/', getUserSortFields, handleUserQuery, UserController.getAll);
router.get('/:id', hasUserById, UserController.getById);
router.post('/', hasUserByEmail, zipcodeExists, companyExists, checkNewUserFields, UserController.addUser);
router.put('/:id', hasUserById, checkUpdateUserFields, UserController.updateUser);
router.delete('/:id', hasUserById, UserController.deleteUser);

router.get('/:id/albums', hasUserById, getUserAlbumSortFields, UserController.getAllAlbums);

export default router;
