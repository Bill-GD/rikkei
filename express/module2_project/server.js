import express from 'express';
import morgan from 'morgan';
import fs from 'node:fs';
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import swaggerConfig from './config/swagger-config.js';
import { addDefaultAdmin } from './utils/helpers.js';
import { internalError } from './utils/responses.js';

await addDefaultAdmin();
if (!fs.existsSync(`${process.cwd()}/public/uploads`)) {
  fs.mkdirSync(`${process.cwd()}/public/uploads`, { recursive: true });
}

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${process.cwd()}/public`));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  // res.status(200).sendFile(`${process.cwd()}/views/homepage.html`);
  res.redirect('/api-docs');
});
app.use((req, res) => {
  res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});

app.use((err, req, res, next) => internalError(res, err));

app.listen(process.env.PORT, () => {
  console.log(`Server started: http://localhost:${process.env.PORT}`);
});
