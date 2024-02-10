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
    }
  }
}

module.exports = schema
