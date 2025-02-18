import express from 'express';
import { readFileSync, writeFileSync } from 'node:fs';
import { __root } from '../helper.js';
import { hasStatus, todoExists } from '../middlewares/todos.js';

const root = `${__root}/data`;
const router = express.Router();

router.get('/', (req, res) => {
  // console.log(import.meta);
  let todos = JSON.parse(readFileSync(`${root}/todos.json`, 'utf8'));
  res.json(todos);
});

router.post('/', (req, res) => {
  const content = req.body.content;
  console.log(req.body);
  const newTodo = {
    id: `${Math.random()}`.replaceAll('.', ''),
    content: content,
    status: false,
  };
  const todos = JSON.parse(readFileSync(`${__root}/data/todos.json`, 'utf8'));
  todos.push(newTodo);
  writeFileSync(
    `${root}/todos.json`,
    JSON.stringify(todos),
    'utf8',
  );
  res.status(201).json({ id: newTodo.id, message: 'Todo item created successfully' });
});

router.put('/:id', hasStatus, todoExists, (req, res) => {
  const todos = JSON.parse(readFileSync(`${__root}/data/todos.json`, 'utf8'));
  const reqTodoIdx = todos.findIndex(e => `${e.id}` === req.params.id);
  todos[reqTodoIdx].status = req.body.status;
  writeFileSync(
    `${root}/todos.json`,
    JSON.stringify(todos),
    'utf8',
  );
  res.status(200).json({ message: 'Todo status updated' });
});

router.delete('/:id', todoExists, (req, res) => {
  const todos = JSON.parse(readFileSync(`${__root}/data/todos.json`, 'utf8'));
  const reqTodoIdx = todos.findIndex(e => `${e.id}` === req.params.id);
  todos.splice(reqTodoIdx, 1);
  writeFileSync(
    `${root}/todos.json`,
    JSON.stringify(todos),
    'utf8',
  );
  res.json({ message: 'Todo item deleted successfully' });
});

export default router;
