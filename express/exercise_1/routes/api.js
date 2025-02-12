const express = require('express');
const router = express.Router();
const { APIv1Controller } = require('../controllers/api.js');

router.get('/api/v1', APIv1Controller.index);

module.exports = router;
