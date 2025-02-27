import express from 'express';
import { TagController } from '../controllers/index.js';
import { handleTagQuery, hasTagId, hasTagName, isTagInUse } from '../middlewares/index.js';

const router = express.Router();

router.get('/', handleTagQuery, TagController.getAll);
router.get('/:id', hasTagId, TagController.getOfId);
router.get('/:id/products', hasTagId, TagController.getProducts);

router.post('/', hasTagName, TagController.addTag);

router.put('/:id', hasTagId, TagController.updateTag);

router.delete('/:id', hasTagId, isTagInUse, TagController.deleteTag);

export default router;
