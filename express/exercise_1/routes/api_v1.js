const express = require('express');
const router = express.Router();
const { APIv1Controller } = require('../controllers/api.js');

router.get('/', APIv1Controller.index);

// users
router.get('/users', APIv1Controller.getAllUsers);
router.get('/users/:id', APIv1Controller.getUserById);
router.post('/users', APIv1Controller.addNewUser);
router.put('/users/:id', APIv1Controller.updateUserById);
router.delete('/users/:id', APIv1Controller.deleteUserById);

module.exports = router;
