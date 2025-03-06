import db from '../config/database.js';

export const JobService = {
  getAll: async (salaryRange, category, location, skills, sorting, paging) => {
    const query = db('job').select('*');

    if (salaryRange) query.where({ salary_min: salaryRange.min }).where({ salary_max: salaryRange.max });

    if (category) query.where('')

    if (sorting) query.orderBy(sorting.sort, sorting.order);
    if (paging) query.limit(paging.limit).offset(paging.offset);

    return query;
  },
};
