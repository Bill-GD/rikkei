import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import 'dotenv/config';

import authRouter from './routes/auth.js';

const app: Express = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${process.cwd()}/public`));

app.use('/auth', authRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started: http://localhost:${process.env.PORT}`);
});

