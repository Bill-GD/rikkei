import db from '../config/database.js';

export class BookService {
  static #tableName = 'book';

  /**
   * @param {{
   *   priceRange: number[],
   *   rateRange: number[],
   *   authorName: string,
   *   limit: number,
   *   offset: number,
   *   sort: string,
   *   order: 'asc'|'desc',
   * }} params
   * @returns {Knex.QueryBuilder} A built query base on the params.
   */
  static getAllBooks(params) {
    let query = db(BookService.#tableName);
    let {
      priceRange,
      rateRange,
      authorName,
      limit,
      offset,
      sort,
      order,
    } = params;

    if (priceRange) query.whereBetween('price', priceRange);
    if (rateRange) query.whereBetween('rate', rateRange);

    if (authorName) {
      query
        .join('author', 'author.author_id', 'book.author_id')
        .where({ 'author.name': authorName })
        .select('book.*');
    } else {
      query.select('*');
    }

    if (sort && order) query.orderBy(sort, order);
    if (limit && offset) query.limit(limit).offset(offset);

    return query;
  }

  /**
   * @param {{id?: number, title?: string}} params
   */
  static async hasBook(params) {
    let { id, title } = params;
    const query = db(BookService.#tableName).count('* as count');

    if (id) query.where({ 'book_id': id });
    if (title) query.where({ title });

    const result = await query;
    return result[0].count > 0;
  }

  static getBookOfId(id) {
    return db(BookService.#tableName).where({ 'book_id': id });
  }

  /**
   * @returns {Promise<number>} The next available ID.
   */
  static async getNextId() {
    return (await db(BookService.#tableName).max('book_id as max'))[0].max + 1;
  }

  /**
   * @param {{
   *   book_id: number,
   *   title: string,
   *   price: number,
   *   rate: number,
   * }} params
   * @returns Newly inserted ID.
   */
  static async addBook(params) {
    const book_id = await BookService.getNextId();
    await db(BookService.#tableName).insert({ book_id, ...params });
    return book_id;
  }
}
