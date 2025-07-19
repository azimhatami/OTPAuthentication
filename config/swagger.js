const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OTP Authentication API',
      description: 'API documentation for OTP Authentication service',
      version: '1.0.0',
      contact: {
        name: 'Azim Hatami',
        email: 'azimhatami.dev@gmail.com'
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./swagger/*.js']
};

// Generate swagger specs
const specs = swaggerJsdoc(options);

// Create a route to serve the swagger UI
const setupSwagger = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
  console.log(`Swagger documentaion is available at http://localhost:${PORT}/docs`);
};

module.exports = setupSwagger;
