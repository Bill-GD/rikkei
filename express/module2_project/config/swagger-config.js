import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Media API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js', './docs/**/*.yaml'],
};

export default swaggerJsDoc(options);
