import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

export default swaggerJsDoc(options);
