export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Arkanoid API',
      version: '1.0.0',
      description: 'API for Arkanoid game',
      contact: {
        name: 'Vladimir Mazhirin',
        url: 'https://github.com/vladimirm85',
        email: 'vladimirm85@gmail.com',
      },
      servers: [
        {
          url: 'https://arkanoid-rss-be.herokuapp.com',
          description: 'Production server',
        },
      ],
    },
  },
  components: {
    schemas: {
      Save: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          saveData: {
            type: 'object',
          },
          userId: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
            format: 'date # or date-time',
          },
        },
      },
    },
  },
  apis: ['./routes/saves.ts'],
};
