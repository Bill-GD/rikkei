import express from 'express';
import { JobController } from '../controllers/index.js';
import { checkJobId, checkJobTitle, getJobSortFields, handleJobFilters } from '../middlewares/job.middlewares.js';
import { handlePageAndSort, hasCategory, hasLocation, checkSkills } from '../middlewares/other.middlewares.js';

const router = express.Router();

router.get('/', hasCategory, hasLocation, checkSkills, handleJobFilters, getJobSortFields, handlePageAndSort, JobController.getAll);
router.get('/:id', checkJobId, JobController.getById);
router.get('/:id/skills', checkJobId, JobController.getSkillsOfId);

router.post('/', checkJobTitle, JobController.addJob);

export default router;
