require('dotenv').config();
const Ajv = require('ajv')

const FastifyWrapper = require('../src/fastify')
const schema = require('../src/schemas/getUser')

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])

describe('Get User tests', () => {
  let app

  test('GET /user route returns users id', async () => {
    app = new FastifyWrapper()
    const username = 'eugefranx'
    const id = '197864017@N02'
    const response = await app.inject('GET', `/user?username=${username}`)

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.id).toBe(id)
  })

  afterAll(async () => {
    app.close()
  })
})
