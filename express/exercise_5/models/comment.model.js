import db from '../database/database.js';

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

  /**
   * @returns {Promise<CommentModel[]>}
   */
  static async getAll(commentId = -1, productId = -1) {
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
      `${baseQuery} ${whereQuery}`,
      whereValues,
    );
    return data.map(CommentModel.fromTable);
  }
}
