import { BookService, ReviewService } from '../services/index.js';
import { internalServerError } from '../utils/helper.utils.js';

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
        message: 'Review added successfully',
        id: newId,
      });
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async updateBook(req, res) {
    try {
      await BookService.updateBook(req.params.id, req.postParams);
      res.json({ message: 'Book updated successfully' });
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async deleteBook(req, res) {
    try {
      await BookService.deleteBook(req.params.id);
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      internalServerError(res, error);
    }
  }
}
