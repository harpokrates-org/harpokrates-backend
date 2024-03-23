require('dotenv').config();
const Ajv = require('ajv')

const FastifyWrapper = require('../src/fastify')
const { flickrWrapperInstance: FlickrWrapper } = require('../src/model/FlickrWrapper')
const schema = require('../src/schemas/getUser')
const DataBase = require('../src/dataBase/DataBase')
const { errorCodes } = require('../src/errors/FlickerWrapperErrors');
const { successMock, notFoundMock } = require('./mocks/getUserMock');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])
const validateUserNotFound = ajv.compile(schema.response[404])

describe('Get User tests', () => {
  let app

  test('GET /user route returns users id', async () => {
    app = new FastifyWrapper()
    const username = 'eugefranx'
    const id = '197864017@N02'

    jest.spyOn(FlickrWrapper, 'caller').mockImplementationOnce(() => {
      return successMock(id)
    })

    const response = await app.inject('GET', `/user?username=${username}`)

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.id).toBe(id)
  })

  test('GET /user route with a non existent username returns ERROR', async () => {
    app = new FastifyWrapper()
    const username = 'ThisUserNameDoesntExist'

    jest.spyOn(FlickrWrapper, 'caller').mockImplementationOnce(() => {
      return notFoundMock()
    })

    const response = await app.inject('GET', `/user?username=${username}`)

    expect(response.statusCode).toBe(404)
    const responseBody = JSON.parse(response.payload)
    expect(validateUserNotFound(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(errorCodes.USER_NOT_FOUND)
  })

  afterAll(async () => {
    app.close()
    DataBase.close()
    jest.restoreAllMocks();
  })
})
