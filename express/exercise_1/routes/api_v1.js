const express = require('express');
const router = express.Router();
const { APIv1Controller } = require('../controllers/api.js');
const userExists = require('../middlewares/user_exists.js');

router.get('/', APIv1Controller.index);

// users
router.get('/users', userExists, APIv1Controller.getAllUsers);
router.get('/users/:id', userExists, APIv1Controller.getUserById);
router.post('/users', userExists, APIv1Controller.addNewUser);
router.put('/users/:id', userExists, APIv1Controller.updateUserById);
router.delete('/users/:id', userExists, APIv1Controller.deleteUserById);

module.exports = router;
