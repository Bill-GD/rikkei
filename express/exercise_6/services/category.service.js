import db from '../config/database.js';

export class CategoryService {
  static #tableName = 'category';

  /**
   * @param {{id?: number, name?: string}} params
   */
  static async hasCategory(params) {
    let { id, name } = params;
    const query = db(CategoryService.#tableName).count('* as count');

    if (id) query.where({ 'category_id': id });
    if (name) query.where({ 'category_name': name });

    const result = await query;
    return result[0].count > 0;
  }

  /**
   * @returns {Promise<number>} The next available ID.
   */
  static async getNextId() {
    return (await db(CategoryService.#tableName).max('category_id as max'))[0].max + 1;
  }
}
