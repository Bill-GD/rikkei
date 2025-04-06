import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import db from './config/db.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
  res.json({ message: 'All users' });
});

app.post('/users', async (req, res) => {
  const { id, email, password } = req.body;
  try {
    await db('user').insert({
      userId: id,
      email: email,
      password: password,
    });
    res.status(201).json({ message: 'Sync user successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
});

app.use((req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});

app.listen(process.env.PORT, () => {
  console.log(`User service started on port ${process.env.PORT}`);
});
