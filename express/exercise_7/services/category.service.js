import db from '../config/database.js';

export const CategoryService = {
  getCategoriesOf: (jobId) => {
    return db('category')
      .select('category.*')
      .join('job_categories', 'job_categories.category_id', 'category.category_id')
      .where({ 'job_categories.job_id': jobId });
  },
  hasCategory: async (name) => {
    const [result] = await db('category').count('* as count').where({ category_name: name });
    return result.count > 0;
  },
};
