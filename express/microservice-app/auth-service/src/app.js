import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

// Routes
app.use('/auth', authRoutes);

export default app;
