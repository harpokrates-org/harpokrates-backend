require('dotenv').config();
const Ajv = require('ajv')

const FastifyWrapper = require('../src/fastify')
const { flickrWrapperInstance: FlickrWrapper } = require('../src/model/FlickrWrapper')
const schema = require('../src/schemas/getUser')
const DataBase = require('../src/dataBase/DataBase')
const { errorCodes } = require('../src/errors/FlickerWrapperErrors');
const { successMock, photoNotFoundMock } = require('./mocks/getSizesMock');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])
const validatePhotoIdNotFound = ajv.compile(schema.response[404])

describe('Get User Photos Sizes tests', () => {
  let app

  test('GET /sizes route returns users photos sizes', async () => {
    app = new FastifyWrapper()
    const photo_id = '53526923995'

    jest.spyOn(FlickrWrapper, 'caller').mockImplementationOnce(() => {
      return successMock()
    })

    const response = await app.inject('GET', `/sizes?photo_id=${photo_id}`)

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.sizes.length).toBeGreaterThan(0)
    expect(responseBody.sizes[0].source).not.toBe('')
    expect(responseBody.sizes[0].label).not.toBe('')
    expect(responseBody.sizes[0].width).not.toBe('')
    expect(responseBody.sizes[0].height).not.toBe('')
  })

  test('GET /sizes route with a non existent photo_id returns ERROR', async () => {
    app = new FastifyWrapper()
    const photo_id = 'ThisPhotoIdDoesntExist'

    jest.spyOn(FlickrWrapper, 'caller').mockImplementationOnce(() => {
      return photoNotFoundMock()
    })

    const response = await app.inject('GET', `/sizes?photo_id=${photo_id}`)

    expect(response.statusCode).toBe(404)
    const responseBody = JSON.parse(response.payload)
    expect(validatePhotoIdNotFound(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(errorCodes.PHOTO_NOT_FOUND)
  })

  afterAll(async () => {
    app.close()
    DataBase.close()
    jest.restoreAllMocks();
  })
})
