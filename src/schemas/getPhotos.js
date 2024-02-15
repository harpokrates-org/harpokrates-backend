const schema = {
  summary: 'Get Flickr User Photos',
  querystring: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        description: 'The Flickr user\'s user_id'
      },
      per_page: {
        type: 'string',
        description: 'Number of photos to return'
      }
    }
  },
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        photos: {
          type: 'array',
          properties: {
            id: {
              type: 'string'
            },
            title: {
              type: 'string'
            }
          }
        }
      },
    },
    404: {
      description: 'User ID not found',
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
