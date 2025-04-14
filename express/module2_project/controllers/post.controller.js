import CommentService from '../service/comment.service.js';
import PostService from '../service/post.service.js';
import { deleteUploadedImage } from '../utils/helpers.js';
import { requestError } from '../utils/responses.js';

export default class PostController {
  static async getPosts(req, res) {
    const posts = await PostService.getPosts({
      dateRange: req.dateRange,
      likeRange: req.likeRange,
      uploaderId: req.query?.uploader,
      offset: req.paging?.offset,
      limit: req.paging?.limit,
      sort: req.sorting?.sort,
      order: req.sorting?.order,
    });
    res.status(200).json(posts.map(e => e.toJson()));
  }

  static async getPost(req, res) {
    const { id } = req.params, post = await PostService.getPost(id);
    post.addComments(await CommentService.getCommentsOf(id));
    res.status(200).json(post.toJson(true));
  }

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

  static async likePost(req, res) {
    const { id } = req.params;
    await PostService.likePost(id);
    res.status(200).json({ message: 'Post liked successfully' });
  }

  static async updatePostContent(req, res) {
    const content = req.body?.content?.trim();
    if (!content) return requestError(res, `Post content wasn't provided`);

    await PostService.updateContent(req.postToUpdate.postId, content);
    delete req.postToUpdate;
    res.status(200).json({ message: 'Post content updated successfully' });
  }

  static async deletePost(req, res) {
    deleteUploadedImage(req.postToDelete.imagePath);
    await PostService.deletePost(req.postToDelete.postId);
    delete req.postToDelete;
    res.status(200).json({ message: 'Post and its comments deleted successfully' });
  }
}
