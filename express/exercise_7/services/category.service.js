import db from '../config/database.js';

export const CategoryService = {
  hasCategory: async (name) => {
    const [result] = await db('category').count('* as count').where({ category_name: name });
    return result.count > 0;
  }
};
