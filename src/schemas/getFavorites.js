const schema = {
  summary: 'Get Flickr Users who have favorited a photo',
  querystring: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The Flickr user\'s username'
      },
      photo_ids: {
        type: 'array',
        description: 'The Flickr user\'s photos ids'
      },
      photos_per_favorite: {
        type: 'number',
        description: 'The number of photos of the person who gave a favorite, to analize'
      },
      depth: {
        type: 'number',
        description: 'The max depth of the search in the network'
      },
    }
  },
  response: {
    200: {
      description: 'Success',
      type: 'object',
      properties: {
        nodes: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        edges: {
          type: 'array',
          items: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        },
      }
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
