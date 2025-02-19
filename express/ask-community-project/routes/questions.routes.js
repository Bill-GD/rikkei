import express from 'express';
import { __root } from '../helpers.js';
const router = express.Router();

router.get('/:id', (req, res) => {
  res.sendFile(`${__root}/public/question-detail.html`);
})

export default router;
