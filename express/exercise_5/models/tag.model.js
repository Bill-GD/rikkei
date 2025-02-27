import mysql from 'mysql2/promise';
import db from '../database/database.js';

export class TagModel {
  /**
   * @param {number} id
   * @param {string} name
   */
  constructor(id = -1, name) {
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

  async add(productId = -1) {
    const hasTag = await TagModel.has(-1, this.name);
    if (!hasTag) {
      const [res] = await db.execute(
        'insert into tag (name) values (?)',
        [this.name],
      );
      console.log(res);
      this.id = res.insertId;
    } else {
       await this.updateId(this.name);
    }

    if (productId >= 0) {
      await this.addFor(productId);
    }
    return this.id;
  }

  async addFor(productId) {
    await db.execute(
      'insert into product_tag (tag_id, product_id) values (?,?)',
      [this.id, productId],
    );
  }

  static async has(id = -1, name = null) {
    let baseQuery = 'select count(*) count from tag',
      queries = [], values = [];
    if (id >= 0) {
      queries.push('tag_id = ?');
      values.push(id);
    }
    if (name) {
      queries.push('name = ?');
      values.push(name);
    }
    const query = mysql.format(
      `${baseQuery} ${queries.length > 0
        ? `where ${queries.join(' and ')}`
        : ''}`,
      values,
    );
    const [[res]] = await db.execute(query);
    return res.count > 0;
  }

  async updateId(name) {
    const [res] = await db.execute(
      'select * from tag where name = ?',
      [name],
    );
    this.id = res[0].tag_id;
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

  static async deleteFor(productId) {
    await db.execute(
      'delete from product_tag where product_id = ?',
      [productId],
    );
  }
}
