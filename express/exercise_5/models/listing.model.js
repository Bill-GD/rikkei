import db from '../database/database.js';
import { CommentModel } from './comment.model.js';
import { TagModel } from './tag.model.js';

export class ListingModel {
  /**
   * @param {string} description
   * @param {number} price
   * @param {number} rate
   */
  constructor(description, price, rate) {
    this.description = description;
    this.price = price;
    this.rate = rate;
  }

  /**
   * @returns {{ rate: number, price: number, description: string }}
   */
  toJson() {
    return {
      description: this.description,
      price: this.price,
      rate: this.rate,
    };
  }

  static fromTable(json) {
    return new ListingModel(json.description, json.price, json.rate);
  }

  async add(productId) {
    const [res] = await db.execute(
      'insert into listing (description, price, rate, product_id) values (?,?,?,?)',
      [this.description, this.price, this.rate, productId],
    );
    return res.insertId;
  }

  /**
   * @returns {Promise<ListingModel[]>}
   */
  static async getAll(productId = -1) {
    let baseQuery = 'select * from listing',
      whereQuery = '';

    if (productId >= 0) {
      whereQuery = 'where product_id = ?';
    }

    const [data] = await db.execute(
      `${baseQuery} ${whereQuery}`,
      [productId],
    );

    return data.map(ListingModel.fromTable);
  }

  static async delete(productId) {
    await db.execute(
      'delete from listing where product_id = ?',
      [productId],
    );
  }
}
