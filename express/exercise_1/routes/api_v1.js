import express from 'express';

import { APIv1Controller } from '../controllers/api.js';
import userExists from '../middlewares/user_exists.js';

const router = express.Router();
router.get('/', APIv1Controller.index);

// users
router.get('/users', userExists, APIv1Controller.getAllUsers);
router.get('/users/:id', userExists, APIv1Controller.getUserById);
router.post('/users', userExists, APIv1Controller.addNewUser);
router.put('/users/:id', userExists, APIv1Controller.updateUserById);
router.delete('/users/:id', userExists, APIv1Controller.deleteUserById);

export default router;
