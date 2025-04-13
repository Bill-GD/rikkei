import multer from 'multer';
import upload from '../config/multer-config.js';
import PostService from '../service/post.service.js';
import { internalError, requestError } from '../utils/responses.js';

export function uploadSingleFile(field) {
  return async function (req, res, next) {
    const uploader = upload.single(field);

    uploader(req, res, err => {
      if (!err) {
        next();
        return;
      }
      if (err instanceof multer.MulterError) {
        console.log('multer err', err);
        requestError(res, err.message);
      } else if (err) {
        console.log('other err', err);
        internalError(res, err);
      }
    });
  };
}

export async function postExists(req, res, next) {
  const { id } = req.params;
  const hasPost = await PostService.hasPost(id);
  if (!hasPost) {
    res.status(403).json({ message: 'Post not found' });
    return;
  }
  next();
}

export async function checkDeletePostPermission(req, res, next) {
  const post = await PostService.getPost(req.params.id);
  const currentUser = req.authenticatedUser;
  if (currentUser.isAdmin || currentUser.userId === post.uploaderId) {
    req.postToDelete = post;
    next();
    return;
  }
  res.status(403).json({ message: 'User is not authorized to perform this action' });
}
