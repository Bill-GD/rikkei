import { BookService, ReviewService } from '../services/index.js';
import { internalServerError, invalidRequest } from '../utils/helper.utils.js';

export class BookController {
  static async getAll(req, res) {
    try {
      const result = await BookService.getAllBooks(req.query.params);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async getBookOfId(req, res) {
    try {
      const result = await BookService.getBookOfId(req.params.id);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async getReviewsOfBookOfId(req, res) {
    try {
      const result = await ReviewService.getReviewsOfBook(req.params.id);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async addBook(req, res) {
    try {
      const newId = await BookService.addBook(req.postParams);
      res.status(201).json({
        message: 'Book added successfully',
        id: newId,
      });
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async addReview(req, res) {
    try {
      const newId = await ReviewService.addReview(req.params.id, req.body.content);
      res.status(201).json({
        message: 'Book added successfully',
        id: newId,
      });
    } catch (error) {
      internalServerError(res, error);
    }
  }
}
