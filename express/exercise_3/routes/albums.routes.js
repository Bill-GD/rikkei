import express from 'express';
import { AlbumController } from '../controllers/index.js';
import {
  checkPageQuery, checkSortQuery, getAlbumSortFields, hasAlbumId, hasAlbumTitle,
  hasUserById,
} from '../middlewares/index.js';

const router = express.Router();

router.get('/', checkPageQuery, getAlbumSortFields, checkSortQuery, AlbumController.getAll);
router.get('/:id', hasAlbumId, AlbumController.getById);
router.post('/', hasUserById, hasAlbumTitle, AlbumController.addAlbum);
router.put('/:id', hasAlbumId, hasAlbumTitle, AlbumController.updateAlbum);
router.delete('/:id', hasAlbumId, AlbumController.deleteAlbum);

export default router;
