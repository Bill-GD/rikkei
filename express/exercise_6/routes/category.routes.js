import express from 'express';
import { CategoryController } from '../controllers/index.js';
import { getSortFields as getBookSortFields, handleQuery } from '../middlewares/book.middlewares.js';
import { checkId, getSortFields as getCategorySortFields } from '../middlewares/category.middlewares.js';
import { handlePaginationAndSort } from '../middlewares/other.middlewares.js';

const router = express.Router();

router.get('/', getCategorySortFields, handlePaginationAndSort, CategoryController.getAll);
router.get('/:id', checkId, CategoryController.getCategoryOfId);
router.get('/:id/books', checkId, handleQuery, getBookSortFields, handlePaginationAndSort, CategoryController.getBooksOfCategoryId);

export default router;
