require('dotenv').config();
const Ajv = require('ajv')

const FastifyWrapper = require('../src/fastify')
const schema = require('../src/schemas/getUserPhotos')
const { errorCodes } = require('../src/errors/FlickerWrapperErrors');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])
const validateUserNotFound = ajv.compile(schema.response[404])

describe('Get Photos tests', () => {
  let app

  test('GET /user/:username/photos?count=<count> route returns user photos', async () => {
    app = new FastifyWrapper()
    const username = 'matthias416'
    const count = 12;
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
    const response = await app.inject('GET', `/user/${username}/photos?count=${count}`)

    expect(response.statusCode).toBe(404)
    const responseBody = JSON.parse(response.payload)
    expect(validateUserNotFound(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(errorCodes.USER_NOT_FOUND)
  })

  afterAll(async () => {
    app.close()
  })
})
