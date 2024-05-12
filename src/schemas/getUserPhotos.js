const schema = {
  summary: 'Get Flickr Users Photos',
  params: {
    type: 'object',
    properties: {
      user_id: {
        type: 'string',
        description: 'The Flickr user\'s id'
      },
    }
  },
  querystring: {
    type: 'object',
    properties: {
      count: {
        type: 'string',
        description: 'The numbers of photos to be retrieved'
      },
      min_date: {
        type: 'string',
        description: 'The minimum date of the photos to be fetched. Format: unix timestamp'
      },
      max_date: {
        type: 'string',
        description: 'The maximum date of the photos to be fetched. Format: unix timestamp'
      },
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
