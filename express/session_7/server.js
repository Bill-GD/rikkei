import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started: http://localhost:${process.env.PORT}`);
});
