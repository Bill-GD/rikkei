import express from 'express';
import { JobController } from '../controllers/index.js';
import { getJobSortFields, handleJobFilters } from '../middlewares/job.middlewares.js';
import { handlePageAndSort, hasCategory, hasLocation, checkSkills } from '../middlewares/other.middlewares.js';

const router = express.Router();

router.get('/', hasCategory, hasLocation, checkSkills, handleJobFilters, getJobSortFields, handlePageAndSort, JobController.getAll);

export default router;
