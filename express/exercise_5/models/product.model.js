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
  constructor(id, name, status, listing, tags, comments) {
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
   *  listing: {rate: number, price: number, description: string},
   *  comments: {commentId: number, content: string}[],
   *  tags: {tagId: number, tagName: string}[],
   * }}
   */
  toJson() {
    return {
      id: this.id,
      productName: this.name,
      status: this.status,
      listing: this.listing.toJson(),
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

  /**
   * @returns {Promise<ProductModel[]>}
   */
  static async getAll(productId = -1, rangeQuery = null, orderQuery = null, pageQuery = null) {
    // SELECT > FROM > WHERE > GROUP BY > HAVING > ORDER BY > LIMIT > OFFSET
    let baseQuery = 'select p.* from product p inner join listing l on l.product_id = p.product_id',
      whereQueries = [];

    if (productId >= 0) whereQueries.push('product_id = ?');
    if (rangeQuery) whereQueries.push(rangeQuery);

    const [data] = await db.execute(
      `${baseQuery} ${whereQueries.length > 0 ? `where ${whereQueries.join(' and ')}` : ''} ${orderQuery || ''} ${pageQuery || ''}`,
      [productId],
    );

    const result = [];
    for (const productData of data) {
      const tags = await TagModel.getAll(-1, productData.product_id);
      const comments = await CommentModel.getAll(-1, productData.product_id);
      const listing = (await ListingModel.getAll(productData.product_id))[0];

      result.push(ProductModel.fromTable(productData, listing, tags, comments));
    }
    return result;
  }
}
