import { readFileSync } from 'node:fs';
import { __root } from '../helper.js';

export function todoExists(req, res, next) {
  const todos = JSON.parse(readFileSync(`${__root}/data/todos.json`, 'utf8'));
  const reqTodoIdx = todos.findIndex(e => `${e.id}` === req.params.id);
  if (reqTodoIdx < 0) {
    return res.status(404).json({ message: 'Todo item not found' });
  }
  next();
}

export function hasStatus(req, res, next) {
  if (req.body.status === undefined) return res.status(403).json({ message: 'No status sent' });
  next();
}
