import express from 'express';
import { BookController } from '../controllers/index.js';
import {
  checkPost,
  checkNewReviewPost,
  getSortFields,
  handleQuery,
  checkId,
  checkName,
} from '../middlewares/book.middlewares.js';
import { handlePaginationAndSort } from '../middlewares/other.middlewares.js';

const router = express.Router();

router.get('/', handleQuery, getSortFields, handlePaginationAndSort, BookController.getAll);
router.get('/:id', checkId, BookController.getBookOfId);
router.get('/:id/reviews', checkId, BookController.getReviewsOfBookOfId);

router.post('/', checkName, checkPost, BookController.addBook);
router.post('/:id/reviews', checkId, checkNewReviewPost, BookController.addReview);

export default router;
