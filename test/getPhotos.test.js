require('dotenv').config();
const Ajv = require('ajv')
const DataBase = require('../src/dataBase/DataBase')

const FastifyWrapper = require('../src/fastify')
const schema = require('../src/schemas/getUser')
const { errorCodes } = require('../src/errors/FlickerWrapperErrors');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])
const validateUserIdNotFound = ajv.compile(schema.response[404])

describe('Get User Photos tests', () => {
  let app

  test('GET /photos route returns users photos', async () => {
    app = new FastifyWrapper()
    const user_id = '147690652@N06'
    const per_page = 3
    const response = await app.inject('GET', `/photos?user_id=${user_id}&per_page=${per_page}`)

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.photos.length).toBe(per_page)
  })

  test('GET /photos route with a non existent user_id returns ERROR', async () => {
    app = new FastifyWrapper()
    const user_id = 'ThisUserIdDoesntExist'
    const per_page = 3
    const response = await app.inject('GET', `/photos?user_id=${user_id}&per_page=${per_page}`)

    expect(response.statusCode).toBe(404)
    const responseBody = JSON.parse(response.payload)
    expect(validateUserIdNotFound(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(errorCodes.UNKNOWN_USER)
  })

  afterAll(async () => {
    app.close()
    DataBase.close()
  })
})
