import multer from 'multer';
import upload from '../config/multer-config.js';
import PostService from '../service/post.service.js';
import { isValidDate } from '../utils/helpers.js';
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

export async function handleQueries(req, res, next) {
  const uploaderId = +req.query?.uploader,
    minLike = +req.query?.minLike,
    maxLike = +req.query?.maxLike,
    from = req.query?.from?.trim(),
    to = req.query?.to?.trim();

  if (from && to) {
    if (!isValidDate(from) || !isValidDate(to)) return requestError(res, 'Invalid date');
    req.dateRange = { from, to };
  }

  if (!isNaN(uploaderId)) {
    if (uploaderId < 0) return requestError(res, '`uploaderId` must be positive');
    req.query.uploader = uploaderId;
  }

  if (!isNaN(minLike) && !isNaN(maxLike)) {
    if (minLike < 0 || maxLike < 1 || minLike > maxLike) {
      return requestError(
        res,
        '`minLike` and `maxLike` must be positive, `minLike` <= `maxLike`',
      );
    }
    req.likeRange = { minLike: minLike, maxLike: maxLike };
  }

  next();
}
