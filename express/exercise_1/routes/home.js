import express from 'express';

import HomeController from '../controllers/home.js';

const router = express.Router();
router.get('/', HomeController.index);

export default router;
