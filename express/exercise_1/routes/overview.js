import express from 'express';

import OverviewController from '../controllers/overview.js';

const router = express.Router();
router.get('/overview', OverviewController.index);

export default router;
