const Ajv = require('ajv')

const FastifyWrapper = require('../src/fastify')
const schema = require('../src/schemas/version')
const { version } = require('../package.json');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])

describe('Version tests', () => {
  let app

  test('GET /version route returns api version', async () => {
    app = new FastifyWrapper()
    const response = await app.inject('GET', '/version')

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.version).toBe(version)
  })

  afterAll(async () => {
    app.close()
  })
})
