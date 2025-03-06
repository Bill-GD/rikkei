import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import { categoryRouter, jobRouter } from './routes/index.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/jobs', jobRouter);
app.use('/categories', categoryRouter);

app.use((req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started: http://localhost:${process.env.PORT}`);
});
