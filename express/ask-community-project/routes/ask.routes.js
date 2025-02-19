import express from 'express';
import { __root } from '../helpers.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(`${__root}/public/ask.html`);
});

export default router;
