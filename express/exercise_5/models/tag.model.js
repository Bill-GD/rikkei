import mysql from 'mysql2/promise';
import db from '../database/database.js';
import { ProductModel } from './product.model.js';

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

  static async isInUse(id) {
    const [[res]] = await db.execute(
      'select count(*) count from product_tag where tag_id = ?',
      [id],
    );
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
  static async getAll(tagId = -1, productId = -1, orderQuery = null, pageQuery = null) {
    let baseQuery = 'select * from tag',
      whereQuery = '',
      whereClauses = [], whereValues = [];

    if (tagId >= 0) {
      whereClauses.push('tag_id = ?');
      whereValues.push(tagId);
    }
    if (productId >= 0) {
      whereClauses.push('product_id = ?');
      whereValues.push(productId);
      baseQuery = 'select t.*, pt.product_id from tag t inner join product_tag pt on pt.tag_id = t.tag_id';
    }
    if (whereClauses.length > 0) {
      whereQuery = `where ${whereClauses.join(' and ')}`;
    }

    const [data] = await db.execute(
      `${baseQuery} ${whereQuery} ${orderQuery || ''} ${pageQuery || ''}`,
      whereValues,
    );
    return data.map(TagModel.fromTable);
  }

  /**
   * @returns {Promise<ProductModel[]>}
   */
  static async getProducts(id) {
    const [data] = await db.execute(
      'select p.product_id from product p inner join product_tag pt on pt.product_id = p.product_id where pt.tag_id = ?',
      [id],
    );

    const res = [];
    for (const item of data) {
      res.push(...(await ProductModel.getAll(item.product_id)));
    }
    return res;
  }

  static async update(id, name) {
    await db.execute(
      'update tag set name = ? where tag_id = ?',
      [name, id],
    );
  }

  static async delete(id) {
    await db.execute(
      'delete from tag where tag_id = ?',
      [id],
    );
  }

  static async deleteFor(productId) {
    await db.execute(
      'delete from product_tag where product_id = ?',
      [productId],
    );
  }
}
