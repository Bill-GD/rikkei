import db from '../config/database.js';

export class AuthorService {
  static #tableName = 'author';

  /**
   * @param {{id?: number, name?: string}} params
   */
  static async getAuthor(params) {
    let { id, name } = params;
    const query = db(AuthorService.#tableName);

    if (id) query.where({ 'author_id': id });
    if (name) query.where({ name });

    const result = await query;
    return result[0];
  }

  /**
   * @param {{id?: number, name?: string}} params
   */
  static async hasAuthor(params) {
    let { id, name } = params;
    const query = db(AuthorService.#tableName).count('* as count');

    if (id) query.where({ 'author_id': id });
    if (name) query.where({ name });

    const result = await query;
    return result[0].count > 0;
  }

  /**
   * @returns {Promise<number>} The next available ID.
   */
  static async getNextId() {
    return (await db(AuthorService.#tableName).max('author_id as max'))[0].max + 1;
  }
}
