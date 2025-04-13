import multer from 'multer';
import upload from '../config/multer-config.js';
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
