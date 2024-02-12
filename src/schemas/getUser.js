const schema = {
  summary: 'Get Flickr User',
  querystring: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The Flickr user\'s username'
      }
    }
  },
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        id: {
          type: 'string',
        }
      },
    },
    404: {
      description: 'User not found',
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
