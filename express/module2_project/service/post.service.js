import db from '../config/db.js';

export default class PostService {
  static async getNextId() {
    return (await db('post').max('post_id as max'))[0].max + 1;
  }

  static async addPost(id, uploaderId, content, imagePath = null) {
    await db('post').insert({
      post_id: id,
      uploader_id: uploaderId,
      content,
      image_path: imagePath,
    });
  }
}
