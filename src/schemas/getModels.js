const schema = {
  summary: 'Get users models',
  querystring: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'Harpokrates user email'
      }
    }
  },
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        models: {
          type: 'array',
          properties: {
            _id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            url: {
              type: 'string',
            },
          },
        },
      },
    },
    401: {
      description: 'Unauthorized',
      type: 'object',
      properties: {
        code: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
      },
    },
  },
};

module.exports = schema;
