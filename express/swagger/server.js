const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger-config');

const server = express();
dotenv.config();

const PORT = 3000;

// import routes
const userRoutes = require('./routes/user.routes');
const jobRoutes = require('./routes/job.routes');
const authRoutes = require('./routes/auth.routes');

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));
server.use(express.static('public'));

// Routes
server.use('/users', userRoutes);
server.use('/jobs', jobRoutes);
server.use('/auth', authRoutes);

server.get('/', (req, res) => {
  res.json({
    message: 'Hello world !!!!',
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
