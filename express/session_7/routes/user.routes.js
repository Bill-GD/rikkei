import express from 'express';
import multer from 'multer';

import UserController from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

// const upload = multer({ dest: 'public/uploads/' });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(file);
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9),
      split = file.originalname.split('.'),
      ext = split[split.length - 1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.get('/', authenticate, authorize(['admin']), UserController.getAll);

router.get('/:id', authenticate, authorize(['admin', 'user']), UserController.getOne);

router.post('/', upload.array('avatar', 10), UserController.createOne);

router.put('/:id', UserController.updateOne);

router.delete('/:id', UserController.deleteOne);

export default router;
