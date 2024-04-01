const schema = {
  summary: 'Get Flickr User Profile',
  querystring: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        description: 'The Flickr user\'s id'
      }
    }
  },
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        realname: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        photo: {
          type: 'string',
        },
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
