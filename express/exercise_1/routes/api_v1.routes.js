import express from 'express';

import { APIv1Controller } from '../controllers/api.js';
import userExists from '../middlewares/user_exists.js';

const router = express.Router();
router.get('/', APIv1Controller.index);

// users
router.get('/users', APIv1Controller.getAllUsers);
router.post('/users', APIv1Controller.addNewUser);

router.use(userExists);
router.get('/users/:id', APIv1Controller.getUserById);
router.put('/users/:id', APIv1Controller.updateUserById);
router.delete('/users/:id', APIv1Controller.deleteUserById);

export default router;
