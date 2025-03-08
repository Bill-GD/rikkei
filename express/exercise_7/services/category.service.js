import db from '../config/database.js';

export const CategoryService = {
  getAll: (sorting, paging) => {
    const query = db('category').select('*');
    if (sorting) query.orderBy(sorting.sort, sorting.order);
    if (paging) query.limit(paging.limit).offset(paging.offset);
    return query;
  },
  get: (id) => {
    return db('category').where({ category_id: id });
  },
  /**
   * @returns {Promise<number>}
   */
  getNextId: async () => {
    return (await db('category').max('category_id as max'))[0].max + 1;
  },
  getCategoriesOf: (jobId) => {
    return db('category')
      .select('category.*')
      .join('job_categories', 'job_categories.category_id', 'category.category_id')
      .where({ 'job_categories.job_id': jobId });
  },
  hasCategory: async (id, name) => {
    const query = db('category').count('* as count');
    if (id) query.where({ category_id: id });
    if (name) query.where({ category_name: name });
    const [result] = await query;
    return result.count > 0;
  },
  getJobs: async (id) => {
    const [category] = await db('category')
      .select('category_name')
      .where({ category_id: id });

    const jobs = await db('job')
      .select('job.job_id', 'job.job_title')
      .join('job_categories', 'job.job_id', 'job_categories.job_id')
      .where({ 'job_categories.category_id': id });

    return {
      categoryName: category.category_name,
      jobs,
    };
  },
  add: async (name) => {
    const nextId = await CategoryService.getNextId();
    await db('category').insert({ category_id: nextId, category_name: name });
    return nextId;
  },
  update: (id, categoryName) => {
    return db('category').where({ category_id: id }).update({ category_name: categoryName });
  },
  delete: async (id) => {
    await db('category').where({ category_id: id }).del();
  },
};
