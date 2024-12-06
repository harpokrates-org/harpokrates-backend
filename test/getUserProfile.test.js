require('dotenv').config();
const Ajv = require('ajv')

const FastifyWrapper = require('../src/fastify')
const { ControlledFlickrCallerInstance: FlickrCaller } = require('../src/model/ControlledFlickrCaller')
const schema = require('../src/schemas/getUserProfile')
const DataBase = require('../src/dataBase/DataBase')
const { errorCodes } = require('../src/errors/FlickerWrapperErrors');
const { successMock, noPhotoMock, notFoundMock } = require('./mocks/getUserProfileMock');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])
const validateUserNotFound = ajv.compile(schema.response[404])

describe('Get User Profile tests', () => {
  let app

  test('GET /user/profile route returns users username, realname, description and photo', async () => {
    app = new FastifyWrapper()
    const mock = successMock()

    jest.spyOn(FlickrCaller, 'caller').mockImplementationOnce(() => {
      return mock
    })

    const response = await app.inject('GET', `/user/profile?user_id=${mock.person.id}`)

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.username).toBe(mock.person.username._content)
    expect(responseBody.realname).toBe(mock.person.realname._content)
    expect(responseBody.description).toBe(mock.person.description._content)
    expect(responseBody.photo)
      .toBe(`https://farm${mock.person.iconfarm}.staticflickr.com/${mock.person.iconserver}/buddyicons/${mock.person.nsid}.jpg`)
  })

  test('GET /user/profile route when user has no profile picture', async () => {
    app = new FastifyWrapper()
    const mock = noPhotoMock()

    jest.spyOn(FlickrCaller, 'caller').mockImplementationOnce(() => {
      return mock
    })

    const response = await app.inject('GET', `/user/profile?user_id=${mock.person.id}`)

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.username).toBe(mock.person.username._content)
    expect(responseBody.realname).toBe(mock.person.realname._content)
    expect(responseBody.description).toBe(mock.person.description._content)
    expect(responseBody.photo).toBe('')
  })

  test('GET /user/profile route with a non existent userID returns ERROR', async () => {
    app = new FastifyWrapper()
    const userID = '000000000@N00'

    jest.spyOn(FlickrCaller, 'caller').mockImplementationOnce(() => {
      return notFoundMock()
    })

    const response = await app.inject('GET', `/user?user_id=${userID}`)

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
