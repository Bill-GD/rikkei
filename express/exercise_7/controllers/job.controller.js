import {
  BenefitService,
  CategoryService,
  CompanyService,
  JobService,
  LocationService,
  SkillService,
} from '../services/index.js';
import { internalServerError } from '../utils/helper.js';

export class JobController {
  static async getAll(req, res) {
    try {
      const { salaryRange, sorting, paging } = req, { category, location, skill } = req.query;
      const result = await JobService.getAll(salaryRange, category, location, skill, sorting, paging);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }
}
