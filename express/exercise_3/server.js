import express from 'express';
import logger from 'morgan';
import 'dotenv/config';

import { albumsRouter, usersRouter } from './routes/index.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/albums', albumsRouter);

app.use((err, req, res, next) => {
  if (err) res.json(err);
});

app.use((req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started: http://localhost:${process.env.PORT}`);
});
