import express from 'express';
import { CategoryController } from '../controllers/index.js';
import { checkCategory, checkDuplicate, getCategorySortFields } from '../middlewares/category.middlewares.js';
import { handlePageAndSort } from '../middlewares/other.middlewares.js';

const router = express.Router();

router.get('/', getCategorySortFields, handlePageAndSort, CategoryController.getAll);
router.get('/:id', checkCategory, CategoryController.getById);
router.get('/:id/jobs', checkCategory, CategoryController.getJobs);

router.post('/', checkDuplicate, CategoryController.addCategory);

router.put('/:id', checkCategory, checkDuplicate, CategoryController.updateCategory);

router.delete('/:id', checkCategory, CategoryController.deleteCategory);

export default router;
