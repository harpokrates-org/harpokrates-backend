require('dotenv').config();
const Ajv = require('ajv')
const DataBase = require('../src/dataBase/DataBase')

const FastifyWrapper = require('../src/fastify')
const schema = require('../src/schemas/putPreferencies');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[201])
const validateUserDoesntExist = ajv.compile(schema.response[401])
const { errorCodes } = require('../src/errors/UserManagerErrors');

describe('Put Preferencies tests', () => {
  let app

  test('PUT /preferencies route adds preferencies to existing user', async () => {
    app = new FastifyWrapper()
    const email = 'otroDoe@mail.com'
    const name = 'philip'
    const surname = 'fry'
    await DataBase.addUser(email, name, surname)

    const response = await app.inject(
      'PUT',
      '/preferencies',
      { 
        email,
        preferencies: {
          model: 'EffNetV2B0'
        }
      }
    )

    expect(response.statusCode).toBe(201)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()

    await DataBase.deleteUser(email)
  })

  test('PUT /preferencies route returns error if user doesnt exist', async () => {
    app = new FastifyWrapper()
    const email = 'nonexistinguser@mail.com'

    const response = await app.inject(
      'PUT',
      '/preferencies',
      { 
        email,
        preferencies: {
          model: 'EffNetV2B0'
        }
      }
    )

    expect(response.statusCode).toBe(401)
    const responseBody = JSON.parse(response.payload)
    expect(validateUserDoesntExist(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(errorCodes.USER_DOESNT_EXIST)

  })

  afterAll(async () => {
    app.close()
    DataBase.close()
  })
})
