const schema = {
  summary: 'Version',
  response: {
    200: {
      description: 'version',
      type: 'object',
      properties: {
        version: {
          type: 'string',
        }
      },
    },
    500: {
      description: 'Server error',
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
