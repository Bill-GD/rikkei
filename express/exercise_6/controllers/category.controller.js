import { CategoryService } from '../services/index.js';
import { internalServerError } from '../utils/helper.utils.js';

export class CategoryController {
  static async getAll(req, res) {
    try {
      const result = await CategoryService.getAll(req.query.params);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async getCategoryOfId(req, res) {
    try {
      const result = await CategoryService.getCategoryOfId(req.params.id);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async getBooksOfCategoryId(req, res) {
    try {
      const result = await CategoryService.getAll(req.query.params);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }
}
