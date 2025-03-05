import express from 'express';
import { BookController } from '../controllers/index.js';
import {
  checkBody,
  checkNewReviewBody,
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

router.post('/', checkName, checkBody, BookController.addBook);
router.post('/:id/reviews', checkId, checkNewReviewBody, BookController.addReview);

router.put('/:id', checkId, checkBody, BookController.updateBook);

router.delete('/:id', checkId, BookController.deleteBook);

export default router;
