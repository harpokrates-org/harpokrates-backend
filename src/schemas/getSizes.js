const schema = {
  summary: 'Get Flickr User Photos Sizes',
  querystring: {
    type: 'object',
    properties: {
      photo_id: {
        type: 'string',
        description: 'The Flickr photo id'
      },
    }
  },
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
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
      },
    },
    404: {
      description: 'Photo not found',
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
