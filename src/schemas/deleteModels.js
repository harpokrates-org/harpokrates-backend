const schema = {
  ummary: 'Delete user model',
  querystring: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'Harpokrates user email'
      },
      modelID: {
        type: 'string',
        description: 'Model identifier'
      },
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
            imageSize: {
              type: 'number',
            },
            threshold: {
              type: 'number',
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