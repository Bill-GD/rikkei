const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.js');

router.get('/product', ProductController.index);

module.exports = router;
