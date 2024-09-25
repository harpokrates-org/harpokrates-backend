require('dotenv').config();
const Ajv = require('ajv')
const DataBase = require('../src/dataBase/DataBase')

const FastifyWrapper = require('../src/fastify')
const schema = require('../src/schemas/login');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])
const { errorCodes } = require('../src/errors/UserManagerErrors');
const randomEmail = require('random-email');

describe('Login tests', () => {
  let app

  test('POST /login route logs in the user if already exists, with no preferencies', async () => {
    app = new FastifyWrapper()
    const email = randomEmail({ domain: 'example.com' });
    const name = 'philip'
    const surname = 'fry'
    await DataBase.addUser(email, name, surname)

    const response = await app.inject(
      'POST',
      '/login',
      { email }
    )

    //expect(response.statusCode).toBe(200)
    if (response.statusCode != 200) {
      expect(response).toBe(200)
    }
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody).toStrictEqual({})

    await DataBase.deleteUser(email)
  })

  test('POST /login route logs in the user if already exists, with preferencies', async () => {
    app = new FastifyWrapper()
    const email = randomEmail({ domain: 'example.com' });
    const name = 'philip'
    const surname = 'fry'
    const preferencies = { model: 'EffNetV2B0' }
    await DataBase.addUser(email, name, surname)
    await DataBase.setPreferencies(email, preferencies.model)

    const response = await app.inject(
      'POST',
      '/login',
      { email }
    )

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody).toStrictEqual({ preferencies })

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
