import db from '../config/database.js';

export class ReviewService {
  static #tableName = 'review';

  static getReviewsOfBook(bookId) {
    return db(ReviewService.#tableName).select('review_id', 'content').where({ 'book_id': bookId });
  }

  /**
   * @returns {Promise<number>} The next available ID.
   */
  static async getNextId() {
    return (await db(ReviewService.#tableName).max('review_id as max'))[0].max + 1;
  }

  /**
   * @param {number} bookId
   * @param {string} content
   * @returns {Promise<number>} Newly added ID.
   */
  static async addReview(bookId, content) {
    const newId = await ReviewService.getNextId();
    await db(ReviewService.#tableName).insert({
      review_id: newId,
      book_id: bookId,
      content: content,
    });
    return newId;
  }
}
