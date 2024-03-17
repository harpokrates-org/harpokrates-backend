const schema = {
  summary: 'Register User',
  querystring: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'The user\'s email'
      }
    }
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
  }
}

module.exports = schema
