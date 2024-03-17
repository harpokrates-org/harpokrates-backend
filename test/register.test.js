require('dotenv').config();
const Ajv = require('ajv')
const DataBase = require('../src/dataBase/DataBase')

const FastifyWrapper = require('../src/fastify')
const schema = require('../src/schemas/register')

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[201])

describe('Register tests', () => {
  let app

  test('POST /register route registers a new user and returns added user', async () => {
    app = new FastifyWrapper()
    const email = 'doe@mail.com'
    const response = await app.inject(
      'POST',
      '/register',
      { email }
    )

    expect(response.statusCode).toBe(201)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.email).toBe(email)
  })

  afterAll(async () => {
    app.close()
    DataBase.close()
  })
})
