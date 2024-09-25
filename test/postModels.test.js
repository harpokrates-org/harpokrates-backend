require('dotenv').config();
const Ajv = require('ajv');
const DataBase = require('../src/dataBase/DataBase');

const FastifyWrapper = require('../src/fastify');
const schema = require('../src/schemas/postModels');

const ajv = new Ajv();
const validateSuccess = ajv.compile(schema.response[201]);
const validateUserDoesntExist = ajv.compile(schema.response[401]);
const { errorCodes } = require('../src/errors/UserManagerErrors');
const randomEmail = require('random-email');


describe('Put models tests', () => {
  let app;

  test('POST /models route adds models to existing user', async () => {
    app = new FastifyWrapper();
    const email = randomEmail({ domain: 'example.com' });
    const name = 'philip';
    const surname = 'fry';
    await DataBase.addUser(email, name, surname);

    const response = await app.inject('POST', '/models', {
      email,
      modelName: 'MobileNet-Stego',
      modelURL: 'https://www.kaggle.com/models/user/mobilenet-stego/TfJs/default/1',
    });
    expect(response.statusCode).toBe(201);
    const responseBody = JSON.parse(response.payload);
    expect(validateSuccess(responseBody)).toBeTruthy();

    await DataBase.deleteUser(email);
  });

  test('POST /models route returns error if user doesnt exist', async () => {
    app = new FastifyWrapper();
    const email = 'nonexistinguser@mail.com';

    const response = await app.inject('POST', '/models', {
      email,
      modelName: 'MobileNet-Stego',
      modelURL: 'https://www.kaggle.com/models/user/mobilenet-stego/TfJs/default/1',
    });

    expect(response.statusCode).toBe(401);
    const responseBody = JSON.parse(response.payload);
    expect(validateUserDoesntExist(responseBody)).toBeTruthy();
    expect(responseBody.code).toBe(errorCodes.USER_DOESNT_EXIST);
  });

  test('POST /models route returns error if model already exists', async () => {
    app = new FastifyWrapper();
    const email = randomEmail({ domain: 'example.com' });
    const name = 'philip';
    const surname = 'fry';
    await DataBase.addUser(email, name, surname);
    const body = {
      email,
      modelName: 'EfficientNet',
      modelURL: 'www.kaggle.com'
    }

    // first time adding the model
    await app.inject('POST', '/models', body);
    // second time adding it
    const response = await app.inject('POST', '/models', body);

    const responseBody = JSON.parse(response.payload);
    expect(responseBody.code).toBe(errorCodes.MODEL_ALREADY_EXISTS);
    await DataBase.deleteUser(email)
  });

  afterAll(async () => {
    app.close();
    DataBase.close();
  });
});
