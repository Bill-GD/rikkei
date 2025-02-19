import express from 'express';
import { readFileSync, writeFileSync } from 'node:fs';
import { __root } from '../helpers.js';
import { checkHasQuestion, checkNoQuestion } from '../middlewares/questions.js';

const router = express.Router();

router.get('/questions', (req, res) => {
  const questions = JSON.parse(readFileSync(`${__root}/dev-data/questions.json`, 'utf8'));
  res.status(200).json(questions);
});

router.get('/questions/:id', checkNoQuestion, (req, res) => {
  const questions = JSON.parse(readFileSync(`${__root}/dev-data/questions.json`, 'utf8'));
  const reqQuestion = questions.find(e => e.id === +req.params.id);
  res.status(200).json(reqQuestion);
});

router.post('/questions', checkHasQuestion, (req, res) => {
  const questions = JSON.parse(readFileSync(`${__root}/dev-data/questions.json`, 'utf8'));
  const newQuestion = {
    id: parseInt(`${Math.random() * 10}`.replaceAll('.', '')),
    content: req.body.content,
    like: 0,
    dislike: 0,
  };
  questions.push(newQuestion);
  updateQuestions(questions);
  res.status(201).json({ message: 'Question posted successfully' });
});

router.put('/questions/:id', checkNoQuestion, (req, res) => {
  const questions = JSON.parse(readFileSync(`${__root}/dev-data/questions.json`, 'utf8'));
  const reqQuestionIdx = questions.findIndex(e => e.id === +req.params.id);
  questions[reqQuestionIdx].content = req.body.content;
  updateQuestions(questions);
  res.status(200).json({ message: 'Question updated successfully' });
});

router.delete('/questions/:id', checkNoQuestion, (req, res) => {
  const questions = JSON.parse(readFileSync(`${__root}/dev-data/questions.json`, 'utf8'));
  const reqQuestionIdx = questions.findIndex(e => e.id === +req.params.id);
  questions.splice(reqQuestionIdx, 1);
  updateQuestions(questions);
  res.status(200).json({ message: 'Question deleted successfully' });
});

function updateQuestions(questions) {
  writeFileSync(
    `${__root}/dev-data/questions.json`,
    JSON.stringify(questions),
    'utf8',
  );
}

export default router;
