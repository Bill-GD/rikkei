import db from '../database/database.js';
import { ListingModel } from './listing.model.js';
import { TagModel } from './tag.model.js';

export class CommentModel {
  /**
   * @param {number} id
   * @param {string} content
   */
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }

  /**
   * @returns {{commentId: number, content: string}}
   */
  toJson() {
    return {
      commentId: this.id,
      content: this.content,
    };
  }

  static fromTable(json) {
    return new CommentModel(json.comment_id, json.content);
  }

  async add(productId) {
    const [res] = await db.execute(
      'insert into comment (content, product_id) values (?,?)',
      [this.content, productId],
    );
    this.id = res.insertId;
    return this.id;
  }

  /**
   * @returns {Promise<CommentModel[]>}
   */
  static async getAll(commentId = -1, productId = -1, orderQuery = null, pageQuery = null) {
    let baseQuery = 'select * from comment',
      whereQuery = '',
      whereClauses = [], whereValues = [];

    if (commentId >= 0) {
      whereClauses.push('comment_id = ?');
      whereValues.push(commentId);
    }
    if (productId >= 0) {
      whereClauses.push('product_id = ?');
      whereValues.push(productId);
    }
    if (whereClauses.length > 0) {
      whereQuery = `where ${whereClauses.join(' and ')}`;
    }

    const [data] = await db.execute(
      `${baseQuery} ${whereQuery} ${orderQuery || ''} ${pageQuery || ''}`,
      whereValues,
    );
    return data.map(CommentModel.fromTable);
  }

  static async has(id) {
    const [[res]] = await db.execute(
      'select count(*) count from comment where comment_id = ?',
      [id],
    );
    return res.count > 0;
  }

  static async update(id, content) {
    await db.execute(
      'update comment set content = ? where comment_id = ?',
      [content, id],
    );
  }

  static async delete(id) {
    await db.execute(
      'delete from comment where comment_id = ?',
      [id],
    );
  }
}
