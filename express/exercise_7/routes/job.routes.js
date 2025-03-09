import express from 'express';
import { JobController } from '../controllers/index.js';
import { checkCategory } from '../middlewares/category.middlewares.js';
import {
  checkJobId,
  checkJobTitle,
  checkPostBody,
  getJobSortFields,
  handleJobFilters,
  handlePostBody,
} from '../middlewares/job.middlewares.js';
import { handlePageAndSort, checkSkills, checkLocation, checkCompany } from '../middlewares/other.middlewares.js';

const router = express.Router();

router.get('/', checkCategory, checkLocation, checkSkills, handleJobFilters, getJobSortFields, handlePageAndSort, JobController.getAll);
router.get('/:id', checkJobId, JobController.getById);
router.get('/:id/skills', checkJobId, JobController.getSkillsOfId);

router.post('/', checkPostBody, checkJobTitle, checkLocation, checkCompany, handlePostBody, JobController.addJob);
router.post('/:id/skills', checkJobId, JobController.addSkill);

router.put('/:id', checkJobId, checkLocation, checkCompany, handlePostBody, JobController.updateJob);

router.delete('/:id', checkJobId, JobController.deleteJob);

export default router;
