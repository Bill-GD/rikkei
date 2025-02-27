import express from 'express';
import { ProductController } from '../controllers/index.js';
import {
  getProductSortFields,
  handleProductPost,
  handleProductQuery,
  hasProductId,
  hasProductName,
} from '../middlewares/index.js';

const router = express.Router();

router.get('/', getProductSortFields, handleProductQuery, ProductController.getAll);
router.get('/:id', hasProductId, ProductController.getId);
router.get('/:id/listing', ProductController.getListingOfId);
router.get('/:id/tags', ProductController.getTagsOfId);
router.get('/:id/comments', ProductController.getCommentsOfId);

router.post('/', handleProductPost, hasProductName, ProductController.addProduct);
router.post('/:id/comments', hasProductId, ProductController.addComment);

router.put('/:id', hasProductId, ProductController.updateProduct);

router.delete('/:id', hasProductId, ProductController.deleteProduct);

export default router;
