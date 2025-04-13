import PostService from '../service/post.service.js';
import { requestError } from '../utils/responses.js';

export default class PostController {
  static async createPost(req, res) {
    const nextId = await PostService.getNextId();

    const content = req.body?.content?.trim(), { imagePath } = req.body;
    if (content === undefined || content.length <= 0) {
      return requestError(res, `Post content wasn't provided`);
    }

    await PostService.addPost(nextId, req.authenticatedUser.userId, content, imagePath);

    res.status(201).json({
      message: 'Post created successfully',
      id: nextId,
      imagePath,
    });
  }
}
