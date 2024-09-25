const schema = {
  summary: 'Set users models',
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'The user email',
        format: 'email',
      },
      modelName: {
        type: 'string',
        description: 'The model name'
      },
      modelURL: {
        type: 'string',
        description: 'The model URL'
      }
    },
    required: ['email', 'modelName', 'modelURL'],
  },
  response: {
    201: {
      description: 'Created',
      type: 'object',
      properties: {
        preferencies: {
          type: 'object',
          properties: {
            model: {
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
