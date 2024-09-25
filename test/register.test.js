require('dotenv').config();
const Ajv = require('ajv')
const DataBase = require('../src/dataBase/DataBase')

const FastifyWrapper = require('../src/fastify')
const schema = require('../src/schemas/register');
const { errorCodes } = require('../src/errors/UserManagerErrors');

const ajv = new Ajv()
const validateSuccess = ajv.compile(schema.response[201])
const validateBadRequest = ajv.compile(schema.response[400])
const validateConflict = ajv.compile(schema.response[409])
const fastifyValidationCode = 'FST_ERR_VALIDATION'
const randomEmail = require('random-email');

describe('Register tests', () => {
  let app

  test('POST /register route registers a new user and returns added user', async () => {
    app = new FastifyWrapper()
    const email = randomEmail()
    const name = 'philip'
    const surname = 'fry'
    const response = await app.inject(
      'POST',
      '/register',
      { email, name, surname }
    )

    expect(response.statusCode).toBe(201)
    const responseBody = JSON.parse(response.payload)
    expect(validateSuccess(responseBody)).toBeTruthy()
    expect(responseBody.email).toBe(email)
    expect(await DataBase.userExists(email)).toBeTruthy()

    await DataBase.deleteUser(email)
  })

  test('POST /register route with invalid email (no @) returns ERROR', async () => {
    app = new FastifyWrapper()
    const email = 'doemail.com'
    const name = 'philip'
    const surname = 'fry'
    const response = await app.inject(
      'POST',
      '/register',
      { email, name, surname }
    )

    expect(response.statusCode).toBe(400)
    const responseBody = JSON.parse(response.payload)
    expect(validateBadRequest(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(fastifyValidationCode)
    expect(responseBody.message.includes('format')).toBeTruthy()
    expect(responseBody.message.includes('email')).toBeTruthy()
  })

  test('POST /register route with invalid email (no .*) returns ERROR', async () => {
    app = new FastifyWrapper()
    const email = 'doe@mail'
    const name = 'philip'
    const surname = 'fry'
    const response = await app.inject(
      'POST',
      '/register',
      { email, name, surname }
    )

    expect(response.statusCode).toBe(400)
    const responseBody = JSON.parse(response.payload)
    expect(validateBadRequest(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(fastifyValidationCode)
    expect(responseBody.message.includes('format')).toBeTruthy()
    expect(responseBody.message.includes('email')).toBeTruthy()
  })

  test('POST /register route with no  email returns ERROR', async () => {
    app = new FastifyWrapper()
    const email = 'doe@mail'
    const name = 'philip'
    const surname = 'fry'
    const response = await app.inject(
      'POST',
      '/register',
      { email, name, surname }
    )

    expect(response.statusCode).toBe(400)
    const responseBody = JSON.parse(response.payload)
    expect(validateBadRequest(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(fastifyValidationCode)
    expect(responseBody.message.includes('format')).toBeTruthy()
    expect(responseBody.message.includes('email')).toBeTruthy()
  })

  test('POST /register route with no email returns ERROR', async () => {
    app = new FastifyWrapper()
    const response = await app.inject(
      'POST',
      '/register',
      {}
    )

    expect(response.statusCode).toBe(400)
    const responseBody = JSON.parse(response.payload)
    expect(validateBadRequest(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(fastifyValidationCode)
    expect(responseBody.message.includes('required')).toBeTruthy()
    expect(responseBody.message.includes('email')).toBeTruthy()
  })

  afterAll(async () => {
    app.close()
    DataBase.close()
  })

  test('POST /register route verifies unique email', async () => {
    app = new FastifyWrapper()
    const email = randomEmail()
    const name = 'philip'
    const surname = 'fry'
    await app.inject(
      'POST',
      '/register',
      { email, name, surname }
    )
    const response = await app.inject(
      'POST',
      '/register',
      { email, name, surname }
    )

    expect(response.statusCode).toBe(409)
    const responseBody = JSON.parse(response.payload)
    expect(validateConflict(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(errorCodes.EMAIL_ALREADY_EXISTS)
    expect(await DataBase.userExists(email)).toBeTruthy()

    await DataBase.deleteUser(email)
  })

  test('POST /register route returns error if there is no name', async () => {
    app = new FastifyWrapper()
    const email = 'doe-no-name@mail.com'
    const surname = 'fry'
    const response = await app.inject(
      'POST',
      '/register',
      { email,  surname }
    )

    expect(response.statusCode).toBe(400)
    const responseBody = JSON.parse(response.payload)
    expect(validateBadRequest(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(fastifyValidationCode)
    expect(responseBody.message.includes('required')).toBeTruthy()
    expect(responseBody.message.includes('name')).toBeTruthy()
  })

  test('POST /register route returns error if there is no surname', async () => {
    app = new FastifyWrapper()
    const email = 'doe-no-name@mail.com'
    const name = 'philip'
    const response = await app.inject(
      'POST',
      '/register',
      { email,  name }
    )

    expect(response.statusCode).toBe(400)
    const responseBody = JSON.parse(response.payload)
    expect(validateBadRequest(responseBody)).toBeTruthy()
    expect(responseBody.code).toBe(fastifyValidationCode)
    expect(responseBody.message.includes('required')).toBeTruthy()
    expect(responseBody.message.includes('surname')).toBeTruthy()
  })  
})
