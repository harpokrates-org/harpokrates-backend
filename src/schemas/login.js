const schema = {
  summary: 'Register User',
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'The user\'s email',
        format: 'email'
      }
    },
    required: ['email']
  },
  response: {
    200: {},
    401: {
      description: 'Unauthorized',
      type: 'object',
      properties: {
        code: {
          type: 'string',
        },
        message: {
          type: 'string',
        }
      },
    },
    409: {
      description: 'Conflict',
      type: 'object',
      properties: {
        code: {
          type: 'string',
        },
        message: {
          type: 'string',
        }
      },
    },
  }
}

module.exports = schema
