const schema = {
  summary: 'Get Flickr Users Photos',
  querystring: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The Flickr user\'s username'
      },
      count: {
        type: 'string',
        description: 'The numbers of photos to be retrieved'
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
            },
            sizes: {
              type: 'array',
              properties: {
                label: {
                  type: 'string'
                },
                width: {
                  type: 'number'
                },
                height: {
                  type: 'number'
                },
                source: {
                  type: 'string'
                }
              }
            }
          }
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
