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
    }
  }
}

module.exports = schema
