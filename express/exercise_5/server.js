import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import { productRouter, testRouter } from './routes/index.js';


const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/test', testRouter);
app.use('/products', productRouter);

app.use((req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});

app.listen(port, () => {
  console.log(`Server started: http://localhost:${port}`);
});
