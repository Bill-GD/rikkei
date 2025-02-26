import db from '../database/database.js';

export class TagModel {
  /**
   * @param {number} id
   * @param {string} name
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  /**
   * @returns {{tagId: number, tagName: string}}
   */
  toJson() {
    return {
      tagId: this.id,
      tagName: this.name,
    };
  }

  static fromTable(json) {
    return new TagModel(json.tag_id, json.name);
  }

  /**
   * @returns {Promise<TagModel[]>}
   */
  static async getAll(tagId = -1, productId = -1) {
    let baseQuery = 'select t.*, pt.product_id from tag t inner join product_tag pt on pt.tag_id = t.tag_id',
      whereQuery = '',
      whereClauses = [], whereValues = [];

    if (tagId >= 0) {
      whereClauses.push('tag_id = ?');
      whereValues.push(tagId);
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
    return data.map(TagModel.fromTable);
  }
}
