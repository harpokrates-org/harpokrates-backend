const schema = {
  summary: 'Set user\'s preferencies',
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'The user\'s email',
        format: 'email'
      },
      preferencies: {
        type: 'object',
        properties: {
          model: {
            type: 'string',
          }
        },
        required: ['model']
      }
    },
    required: ['email', 'preferencies']
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
            }
          }
        }
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
        }
      },
    }
  }
}

module.exports = schema
