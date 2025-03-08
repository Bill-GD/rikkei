import { JobService, SkillService } from '../services/index.js';
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

  static async getById(req, res) {
    try {
      const result = await JobService.get(req.params.id);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async getSkillsOfId(req, res) {
    try {
      const result = await JobService.getSkills(req.params.id);
      res.json(result);
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async addJob(req, res) {
    try {
      const result = await JobService.add(...Object.values(req.body));
      res.json({ message: 'Added new job successfully', id: result });
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async addSkill(req, res) {
    try {
      await SkillService.addFor(req.params.id, req.body.skillName);
      res.status(201).json({ message: `Added skill for job ${req.params.id}` });
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async updateJob(req, res) {
    try {
      await JobService.update(req.params.id, ...Object.values(req.body));
      res.json({ message: 'Updated job successfully' });
    } catch (error) {
      internalServerError(res, error);
    }
  }

  static async deleteJob(req, res) {
    try {
      await SkillService.deleteFor(req.params.id);
      await JobService.delete(req.params.id);
      res.json({ message: 'Deleted job successfully' });
    } catch (error) {
      internalServerError(res, error);
    }
  }
}
