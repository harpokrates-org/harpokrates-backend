require('dotenv').config();
const Ajv = require('ajv')
const DataBase = require('../src/dataBase/DataBase')

const FastifyWrapper = require('../src/fastify')
const schema = require('../src/schemas/login');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])
const { errorCodes } = require('../src/errors/UserManagerErrors');

describe('Register tests', () => {
  let app

  test('POST /login route logs in the user if already exists', async () => {
    app = new FastifyWrapper()
    const email = 'doe@mail.com'
    await DataBase.addUser(email)

    const response = await app.inject(
      'POST',
      '/login',
      { email }
    )

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()

    await DataBase.deleteUser(email)
  })

  test('POST /login route returns error if user doesnt exist', async () => {
    app = new FastifyWrapper()
    const email = 'nonexistinguser@mail.com'

    const response = await app.inject(
      'POST',
      '/login',
      { email }
    )

    expect(response.statusCode).toBe(401)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(errorCodes.USER_DOESNT_EXIST)

  })

  afterAll(async () => {
    app.close()
    DataBase.close()
  })
})
