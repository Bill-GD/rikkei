import express from 'express';

import ProductController from '../controllers/product.js';

const router = express.Router();
router.get('/', ProductController.index);

export default router;
