import express from 'express';
import { ProductController } from '../controllers/index.js';
import {
  checkAddProductBody,
  checkProductGetQueries, checkUpdateProductBody,
  hasProductOfId,
  hasProductWithName,
} from '../middlewares/index.js';

const router = express.Router();

router.get('/', checkProductGetQueries, ProductController.getAll);
router.get('/:id', hasProductOfId, ProductController.getProductOfId);
router.get('/:id/listing', hasProductOfId, ProductController.getListingOfId);
router.get('/:id/tags', hasProductOfId, ProductController.getTagsOfId);
router.get('/:id/comments', hasProductOfId, ProductController.getCommentsOfId);

router.post('/', checkAddProductBody, hasProductWithName, ProductController.addProduct);
router.post('/:id/comments', hasProductOfId, ProductController.addCommentForProduct);

router.put('/:id', hasProductOfId, checkUpdateProductBody, ProductController.updateProductOfId);

router.delete('/:id', hasProductOfId, ProductController.deleteProductOfId);

export default router;
