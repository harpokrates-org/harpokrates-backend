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
      models: {
        type: 'array',
        description: 'The users models given by name and url',
        properties: {
          name: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
        },
        required: ['name', 'url'],
      },
    },
    required: ['email', 'models'],
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
