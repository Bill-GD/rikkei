import express from 'express';
import multer from 'multer';
import AuthController from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/auth.middleware.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body);
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9),
      split = file.originalname.split('.'),
      ext = split[split.length - 1];
    const filename = `${file.fieldname}-${uniqueSuffix}.${ext}`;
    req.body.avatar = `/uploads/${filename}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.post('/register', upload.single('avatar'), validateBody, AuthController.register);
router.post('/sign-in', AuthController.signin);

export default router;
