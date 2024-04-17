require('dotenv').config();
const Ajv = require('ajv')

const FastifyWrapper = require('../src/fastify')
const { flickrWrapperInstance: FlickrWrapper, flickrMethods } = require('../src/model/FlickrWrapper')
const schema = require('../src/schemas/getFavorites')
const DataBase = require('../src/dataBase/DataBase')
const { successMock: getFavoritesSuccessMock } = require('./mocks/getFavoritesMock');
const { successMock: getUserSuccessMock } = require('./mocks/getUserMock');
const { successMock: getPhotosSuccessMock } = require('./mocks/getPhotosMock');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])

describe('Get Favorites tests', () => {
  let app

  test('GET /favorites route returns nodes and edges of a graph', async () => {
    app = new FastifyWrapper()
    const photo_ids = ['["51298709139","51250875038"]' ] // eslint-disable-line
    const username = 'shutterbug_uk2012'
    let getFavoritesCallNumber = 0

    jest.spyOn(FlickrWrapper, 'caller').mockImplementation((method, params) => {
      if (method === flickrMethods.getFavorites) {
        const response = getFavoritesSuccessMock(getFavoritesCallNumber)
        getFavoritesCallNumber += 3
        return response
      } else if (method === flickrMethods.findUserByUsername) {
        return getUserSuccessMock(params.username)
      } else if (method === flickrMethods.getPhotos) {
        return getPhotosSuccessMock(params.user_id, params.per_page)
      }
    })

    const response = await app.inject('GET', `/favorites?photo_ids=${photo_ids}&username=${username}`)

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.nodes.includes(username)).toBeTruthy()
  })

  test('GET /favorites route with depth = 0', async () => {
    app = new FastifyWrapper()
    const photo_ids = ['["51298709139","51250875038"]' ] // eslint-disable-line
    const username = 'shutterbug_uk2012'
    let depth = 0

    const response = await app.inject('GET', 
      `/favorites?photo_ids=${photo_ids}&username=${username}&depth=${depth}`
    )

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.nodes.includes(username)).toBeTruthy()
    expect(responseBody.edges).toEqual([])
  })

  afterAll(async () => {
    app.close()
    DataBase.close()
    jest.restoreAllMocks();
  })
})
