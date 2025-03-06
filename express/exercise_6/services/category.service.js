import db from '../config/database.js';
import { BookService } from './book.service.js';

export class CategoryService {
  static #tableName = 'category';

  /**
   * @param {{
   *   limit: number,
   *   offset: number,
   *   sort: string,
   *   order: 'asc'|'desc',
   * }} params
   * @returns {Knex.QueryBuilder}
   */
  static getAll(params) {
    const query = db(CategoryService.#tableName).select('*');
    let { sort, order, limit, offset } = params;

    if (sort && order) query.orderBy(sort, order);
    if (limit && offset) query.limit(limit).offset(offset);

    return query;
  }

  static getCategoryOfId(id) {
    return db(CategoryService.#tableName).where({ 'category_id': id });
  }

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

  static getBooksOfId(id) {
    return BookService.getAllBooks(req.query.params).where({ category_id: id });
  }
}
