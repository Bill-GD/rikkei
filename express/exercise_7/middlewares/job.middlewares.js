export function getJobSortFields(req, res, next) {
  if (!req.sorting) req.sorting = {};
  req.sorting.fields = ['job_id', 'job_title', 'salary_min', 'salary_max'];
  req.sorting.sort = 'job_id';
  req.sorting.order = 'asc';
  next();
}

export async function checkJobId(req, res, next) {
  const reqId = req.params.id;
}

export async function checkJobTitle(req, res, next) {
  let { jobTitle } = req.body;
}

export function handleJobFilters(req, res, next) {
  let { salaryMin, salaryMax, category, location } = req.query;
  next();
}
