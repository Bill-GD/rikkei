import express from 'express';

import OverviewController from '../controllers/overview.js';

const router = express.Router();
router.get('/', OverviewController.index);

export default router;
