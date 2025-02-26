import express from 'express';
import { ProductController } from '../controllers/index.js';
import { getProductSortFields, handleProductQuery } from '../middlewares/index.js';

const router = express.Router();

router.get('/', getProductSortFields, handleProductQuery, ProductController.getAll);
router.get('/:id', handleProductQuery, ProductController.getId);
router.get('/:id/listing', handleProductQuery, ProductController.getListingOfId);
router.get('/:id/tags', handleProductQuery, ProductController.getTagsOfId);
router.get('/:id/comments', handleProductQuery, ProductController.getCommentsOfId);

export default router;
