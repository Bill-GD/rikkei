const express = require('express');
const router = express.Router();
const OverviewController = require('../controllers/overview.js');

router.get('/overview', OverviewController.index);

module.exports = router;
