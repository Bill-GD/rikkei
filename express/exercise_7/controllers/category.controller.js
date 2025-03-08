import { CategoryService, JobService } from '../services/index.js';
import { internalServerError } from '../utils/helper.js';

export class CategoryController {
  static async getAll(req, res) {
    try {
      const { sorting, paging } = req;
      const result = await CategoryService.getAll(sorting, paging);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async getById(req, res) {
    try {
      const result = await CategoryService.get(req.params.id);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async getJobs(req, res) {
    try {
      const result = await CategoryService.getJobs(req.params.id);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async addCategory(req, res) {
    try {
      const newId = await CategoryService.add(req.body.categoryName);
      res.json({ message: 'Added category successfully', id: newId });
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async updateCategory(req, res) {
    try {
      await CategoryService.update(req.params.id, req.body.categoryName);
      res.json({ message: 'Updated category successfully' });
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async deleteCategory(req, res) {
    try {
      await CategoryService.delete(req.params.id);
      res.json({ message: 'Deleted category successfully' });
    } catch (error) {
      internalServerError(res, error);
    }
  }
}
