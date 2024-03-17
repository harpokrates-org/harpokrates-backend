require('dotenv').config();
const Ajv = require('ajv')
const DataBase = require('../src/dataBase/DataBase')

const FastifyWrapper = require('../src/fastify')
const schema = require('../src/schemas/getFavorites')

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[200])

describe('Get Favorites tests', () => {
  let app

  test('GET /favorites route returns nodes and edges of a graph', async () => {
    app = new FastifyWrapper()
    const photo_ids = ['["51298709139","51250875038"]' ] // eslint-disable-line
    const username = 'shutterbug_uk2012'
    const response = await app.inject('GET', `/favorites?photo_ids=${photo_ids}&username=${username}`)

    expect(response.statusCode).toBe(200)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.nodes.includes(username)).toBeTruthy()
  })

  afterAll(async () => {
    app.close()
    DataBase.close()
  })
})
