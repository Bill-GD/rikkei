import mysql from 'mysql2/promise';
import db from '../database/database.js';
import { CommentModel } from './comment.model.js';
import { ListingModel } from './listing.model.js';
import { TagModel } from './tag.model.js';

export class ProductModel {
  /**
   * @param {number} id
   * @param {string} name
   * @param {boolean} status
   * @param {ListingModel} listing
   * @param {TagModel[]} tags
   * @param {CommentModel[]} comments
   */
  constructor(id = -1, name, status, listing, tags, comments) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.listing = listing;
    this.tags = tags;
    this.comments = comments;
  }

  /**
   * @returns {{
   *  id: number,
   *  productName: string,
   *  status: boolean,
   *  listing: {rate: number, price: number, description: string}|{},
   *  comments: {commentId: number, content: string}[],
   *  tags: {tagId: number, tagName: string}[],
   * }}
   */
  toJson() {
    return {
      id: this.id,
      productName: this.name,
      status: this.status,
      listing: this.listing?.toJson() || {},
      comments: this.comments.map(e => e.toJson()),
      tags: this.tags.map(e => e.toJson()),
    };
  }

  static fromTable(json, listing, tags = [], comments = []) {
    return new ProductModel(
      json.product_id,
      json.product_name,
      json.status,
      listing,
      tags,
      comments,
    );
  }

  async add() {
    const [res] = await db.execute(
      'insert into product (product_name, status) values (?,?)',
      [this.name, this.status],
    );
    this.id = res.insertId;
    for (const e of this.tags) await e.add(this.id);
    for (const e of this.comments) await e.add(this.id);
    if (this.listing) await this.listing.add(this.id);
    return this.id;
  }

  static async has(id = -1, name = null) {
    let baseQuery = 'select count(*) count from product',
      queries = [], values = [];
    if (id >= 0) {
      queries.push('product_id = ?');
      values.push(id);
    }
    if (name) {
      queries.push('product_name = ?');
      values.push(name);
    }
    const [[res]] = await db.execute(
      `${baseQuery} ${queries.length > 0
        ? `where ${queries.join(' and ')}`
        : ''}`,
      values,
    );
    return res.count > 0;
  }

  /**
   * @returns {Promise<ProductModel[]>}
   */
  static async getAll(productId = -1, rangeQuery = null, orderQuery = null, pageQuery = null) {
    // SELECT > FROM > WHERE > GROUP BY > HAVING > ORDER BY > LIMIT > OFFSET
    let baseQuery = 'select * from product',
      whereQueries = [];

    if (productId >= 0) whereQueries.push(`product_id = ?`);
    if (rangeQuery) {
      baseQuery += ' p inner join listing l on l.product_id = p.product_id';
      whereQueries.push(rangeQuery);
    }

    let query = mysql.format(`${baseQuery} ${whereQueries.length > 0
        ? `where ${whereQueries.join(' and ')}`
        : ''} ${orderQuery || ''} ${pageQuery || ''}`,
      [productId],
    );
    if (rangeQuery) query = query.replaceAll(' product_id ', ' p.product_id ');
    const [data] = await db.execute(query);

    const result = [];
    for (const productData of data) {
      const tags = await TagModel.getAll(-1, productData.product_id);
      const comments = await CommentModel.getAll(-1, productData.product_id);
      const listing = (await ListingModel.getAll(productData.product_id))[0];

      result.push(ProductModel.fromTable(productData, listing, tags, comments));
    }
    return result;
  }

  static async update(id, json) {
    if (json.product_name) await db.execute(
      `update product` +
      // set ${Object.keys(json).map(e => `${e} = ?`).join(',')}` +
      ` set product_name = ?` +
      ' where product_id = ?',
      [json.product_name, id],
    );
    await db.execute(
      `update listing
       set ${Object.keys(json.listing).filter(e => json.listing[e] !== undefined).map(e => `${e} = ?`).join(',')}` +
      ' where product_id = ?',
      [...Object.values(json.listing).filter(e => e !== undefined), id],
    );
  }

  static async delete(id) {
    await ListingModel.delete(id);
    await TagModel.deleteFor(id);
    await db.execute(
      'delete from product where product_id = ?',
      [id],
    );
  }
}
