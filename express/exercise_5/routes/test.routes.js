import express from 'express';
import { readFileSync } from 'node:fs';
import { __root } from '../utils/helper.utils.js';

const router = express.Router();

router.get('/:property', (req, res) => {
  const data = JSON.parse(readFileSync(`${__root}/data/data.json`, 'utf8'));
  res.json(data.map(e => e[req.params.property]));
});

export default router;
