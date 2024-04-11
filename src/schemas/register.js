const schema = {
  summary: 'Register User',
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'The user\'s email',
        format: 'email'
      },
      name: {
        type: 'string',
        description: 'The user\'s name',
      },
      surname: {
        type: 'string',
        description: 'The user\'s surname',
      }
    },
    required: ['email', 'name', 'surname']
  },
  response: {
    201: {
      description: 'Success',
      type: 'object',
      properties: {
        email: {
          type: 'string',
        }
      },
    },
    400: {
      description: 'Bad request',
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
