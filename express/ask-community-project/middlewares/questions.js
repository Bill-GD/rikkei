import { readFileSync } from 'node:fs';
import { __root } from '../helpers.js';

export function checkNoQuestion(req, res, next) {
  const questions = JSON.parse(readFileSync(`${__root}/dev-data/questions.json`, 'utf8'));
  const reqIdx = questions.findIndex(e => e.id === +req.params.id);
  if (reqIdx < 0) return res.status(404).json({ message: 'Question not found' });
  next();
}

export function checkHasQuestion(req, res, next) {
  const questions = JSON.parse(readFileSync(`${__root}/dev-data/questions.json`, 'utf8'));
  const reqIdx = questions.findIndex(e => e.content === req.body.content || '');
  if (reqIdx >= 0) return res.status(409).json({ message: 'Question already exists' });
  next();
}
