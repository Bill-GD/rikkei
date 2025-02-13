import express from 'express';
import { readFileSync } from 'node:fs';
import { __dirname } from '../helper.js';

const root = `${__dirname}/data`;
const router = express.Router();

router.get('/', (req, res) => {
  let todos = JSON.parse(readFileSync(`${root}/todos.json`, 'utf8'));
  res.json(todos);
});

export default router;
