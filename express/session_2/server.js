import express from 'express';
import morgan from 'morgan';
import todoRoutes from './routes/todo.routes.js';
import { __dirname } from './helper.js';

const app = express();
const port = 3000;

function checkStatus(req, res, next) {
  const status = req.query.status;
  if (status === '1') {
    console.log('Status of 1 is checked');
    next();
  } else {
    res.status(403).json({ message: 'No status sent' });
  }
}

function checkRole(req, res, next) {
  if (req.query.role === '1') {
    next();
  } else {
    res.status(403).json({ message: 'Invalid role' });
  }
}

function catchError(err, req, res, next) {
  console.log(`Got an error: ${err}`);
  res.json({ error: err });
}

app.use(morgan('dev'));
// app.use(catchError);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log(`Dirname: ${__dirname}`);
  res.sendFile('public/todo_list_layout.html', { root: __dirname });
});

app.use('/todos', todoRoutes);

app.get('/api/todos', (req, res) => {
  res.sendFile('data/todos.json', { root: __dirname });
});

app.get('/test-middleware', checkRole, checkStatus, (req, res) => {
  res.json({ message: 'Middleware tested successfully' });
});

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}`);
});
