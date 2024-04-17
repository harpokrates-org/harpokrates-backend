require('dotenv').config();
const Ajv = require('ajv')

const FastifyWrapper = require('../src/fastify')
const { flickrWrapperInstance: FlickrWrapper } = require('../src/model/FlickrWrapper')
const schema = require('../src/schemas/getUserPhotos')
const DataBase = require('../src/dataBase/DataBase')
const { errorCodes } = require('../src/errors/FlickerWrapperErrors');
const { successMock: getUserSuccessMock, notFoundMock } = require('./mocks/getUserMock');
const { successMock: getPhotosSuccessMock } = require('./mocks/getPhotosMock');
const { successMock: getSizesSuccessMock } = require('./mocks/getSizesMock');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])
const validateUserNotFound = ajv.compile(schema.response[404])

describe('Get Photos tests', () => {
  let app

  test('GET /user/:username/photos?count=<count> route returns user photos', async () => {
    app = new FastifyWrapper()
    const username = 'matthias416'
    const id = '184374196@N07'
    const count = 12;

    jest.spyOn(FlickrWrapper, 'caller').mockImplementationOnce(() => {
      return getUserSuccessMock(id)
    }).mockImplementationOnce(() => {
      return getPhotosSuccessMock(id, count)
    }).mockImplementation(() => {
      return getSizesSuccessMock()
    })

    const response = await app.inject('GET', `/user/${username}/photos?count=${count}`)

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.photos.length).toBeGreaterThan(0)
    expect(responseBody.photos[0].id).not.toBe('')
    expect(responseBody.photos[0].title).not.toBe('')
    expect(responseBody.photos[0].sizes.length).toBeGreaterThan(0)
    expect(responseBody.photos[0].sizes[0].source).not.toBe('')
    expect(responseBody.photos[0].sizes[0].label).not.toBe('')
    expect(responseBody.photos[0].sizes[0].width).not.toBe('')
    expect(responseBody.photos[0].sizes[0].height).not.toBe('')
  })

  test('GET /user/:username/photos?count=<count> route with a non existent username returns ERROR', async () => {
    app = new FastifyWrapper()
    const username = 'ThisUsernameDoesntExists'
    const count = 12;

    jest.spyOn(FlickrWrapper, 'caller').mockImplementationOnce(() => {
      return notFoundMock()
    })

    const response = await app.inject('GET', `/user/${username}/photos?count=${count}`)

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
