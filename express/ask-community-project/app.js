import express from 'express';
import { __root } from './helpers.js';
import apiRoutes from './routes/api.routes.js';
import askRoutes from './routes/ask.routes.js';
import homeRoutes from './routes/home.routes.js';
import questionsRoutes from './routes/questions.routes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', homeRoutes);
app.use('/ask', askRoutes);
app.use('/question-detail', questionsRoutes);
app.use('/api/v1', apiRoutes);

app.use((req, res) => {
  res.send('<h1>PAGE NOT FOUND</h1>');
});

app.listen(port, () => {
  console.log(`Server started: http://localhost:${port}`);
});
