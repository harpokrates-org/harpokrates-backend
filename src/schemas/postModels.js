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
      },
      modelImageSize: {
        type: 'number',
        description: 'The model expected Image Size'
      },
      modelThreshold: {
        type: 'number',
        description: 'The model Threshold'
      }
    },
    required: ['email', 'modelName', 'modelURL', 'modelImageSize', 'modelThreshold'],
  },
  response: {
    201: {
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
