import db from '../config/db.js';
import PostModel from '../models/post.model.js';

export default class PostService {
  static async getNextId() {
    return (await db('post').max('post_id as max'))[0].max + 1;
  }

  static async hasPost(id) {
    const result = await db('post').where({ post_id: id }).first();
    return !!result;
  }

  static async addPost(id, uploaderId, content, imagePath = null) {
    await db('post').insert({
      post_id: id,
      uploader_id: uploaderId,
      content,
      image_path: imagePath,
    });
  }

  /**
   * Get all posts and returns as a list of PostModel objects.
   * @param {{
   *  dateRange: { from: string, to: string },
   *  likeRange: { minLike: number, maxLike: number },
   *  uploaderId: number,
   *  offset: number,
   *  limit: number,
   *  sort: string,
   *  order: 'asc'|'desc'
   * }} params The query configurations.
   * @returns {Promise<PostModel[]>}
   */
  static async getPosts(params = {}) {
    const query = db('post').select('*');

    if (params.dateRange) {
      query.whereBetween(
        'date_created',
        [`${params.dateRange.from} 00:00:00`, `${params.dateRange.to} 23:59:59`],
      );
    }

    if (params.likeRange) {
      query.whereBetween('like_count', [+params.likeRange.minLike, +params.likeRange.maxLike]);
    }

    if (params.uploaderId !== undefined) {
      query.where({ uploader_id: params.uploaderId });
    }

    if (params.offset !== undefined && params.limit !== undefined) {
      query.offset(params.offset).limit(params.limit);
    }

    if (params.sort && params.order) {
      query.orderBy(params.sort, params.order);
    }

    return (await query).map(PostModel.fromJson);
  }

  static async getPost(id) {
    return PostModel.fromJson(await db('post').where({ post_id: id }).first());
  }

  static async deletePost(id) {
    await db('comment').where({ post_id: id }).del();
    await db('post').where({ post_id: id }).del();
  }
}
