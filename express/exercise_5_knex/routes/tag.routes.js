import express from 'express';
import { TagController } from '../controllers/index.js';
import { checkTagGetQueries, hasTagOfId, hasTagWithName } from '../middlewares/index.js';

const router = express.Router();

router.get('/', checkTagGetQueries, TagController.getAll);
router.get('/:id', hasTagOfId, TagController.getTagOfId);
router.get('/:id/products', hasTagOfId, TagController.getProductsOfTagId);
router.post('/', hasTagWithName, TagController.addTag);
router.put('/:id', hasTagOfId, TagController.updateTagOfId);
router.delete('/:id', hasTagOfId, TagController.deleteTagOfId);

export default router;
