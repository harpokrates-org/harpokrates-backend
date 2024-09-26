require('dotenv').config();
const Ajv = require('ajv');
const DataBase = require('../src/dataBase/DataBase');

const FastifyWrapper = require('../src/fastify');
const schema = require('../src/schemas/getModels');

const ajv = new Ajv();
const validateSuccess = ajv.compile(schema.response[200]);
const validateUserDoesntExist = ajv.compile(schema.response[401]);
const { errorCodes } = require('../src/errors/UserManagerErrors');
const randomEmail = require('random-email');

describe('GET models tests', () => {
  let app;

  test('GET /models route. Getting models from new user returns empty list', async () => {
    app = new FastifyWrapper();
    const email = randomEmail({ domain: 'example.com' });
    const name = 'philip';
    const surname = 'fry';
    await DataBase.addUser(email, name, surname);

    const response = await app.inject('GET', `/models?email=${email}`);
    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.payload);
    expect(validateSuccess(responseBody)).toBeTruthy();
    expect(responseBody.models.length).toBe(0)

    await DataBase.deleteUser(email);
  });

  test('GET /models route returns error if user doesnt exist', async () => {
    app = new FastifyWrapper();
    const email = 'nonexistinguser@mail.com';

    const response = await app.inject('GET', `/models?email=${email}`);

    expect(response.statusCode).toBe(401);
    const responseBody = JSON.parse(response.payload);
    expect(validateUserDoesntExist(responseBody)).toBeTruthy();
    expect(responseBody.code).toBe(errorCodes.USER_DOESNT_EXIST);
  });

  test('GET /models route. Getting models from user with one model returns a list of one item', async () => {
    app = new FastifyWrapper();
    const email = 'otroDoe@mail.com';
    const name = 'philip';
    const surname = 'fry';
    await DataBase.addUser(email, name, surname);

    const modelName = 'MobileNet-Stego';
    const modelURL = 'https://www.kaggle.com/models/user/mobilenet-stego/TfJs/default/1';
    const modelImageSize = 512
    const modelThreshold = 0.8
    const body = {
      email,
      modelName,
      modelURL,
      modelImageSize,
      modelThreshold
    }

    // Add one model
    await app.inject('POST', '/models', body);

    const response = await app.inject('GET', `/models?email=${email}`);
    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.payload);
    expect(validateSuccess(responseBody)).toBeTruthy();
    expect(responseBody.models.length).toBe(1)

    await DataBase.deleteUser(email);
  });

  afterAll(async () => {
    app.close();
    DataBase.close();
  });
});
