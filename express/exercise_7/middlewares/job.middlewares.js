import { JobService } from '../services/index.js';
import { invalidRequest } from '../utils/helper.js';

export function getJobSortFields(req, res, next) {
  if (!req.sorting) req.sorting = {};
  req.sorting.fields = ['job_id', 'job_title', 'salary_min', 'salary_max'];
  req.sorting.sort = 'job_id';
  req.sorting.order = 'asc';
  next();
}

export async function checkJobId(req, res, next) {
  const has = await JobService.hasJob(req.params.id);
  if (has) return next();
  invalidRequest(res, 404, 'Job not found');
}

export async function checkJobTitle(req, res, next) {
  let { jobTitle } = req.body;
  const has = await JobService.hasJob(undefined, jobTitle);
  if (!has) return next();
  invalidRequest(res, 403, 'Job with the same title already exists');
}

export function handleJobFilters(req, res, next) {
  let { salaryMin, salaryMax } = req.query;

  if (salaryMin && salaryMax) {
    if (isNaN(+salaryMin) || isNaN(+salaryMax) || +salaryMin < 0 || +salaryMax < 0) {
      return invalidRequest(res, 400, 'Invalid salary queries', { salaryMin, salaryMax });
    }
    req.salaryRange = { min: salaryMin, max: salaryMax };
  }

  next();
}
